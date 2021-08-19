import { carModel, garageModel, possibleCarModel, userModel } from "../models";
import { getGarageById } from "../helpers";

const date = new Date();

export const newCar = async (req, res) => {
  // Adds a car

  try {
    const newCarName = req.body.name.toLowerCase();
    const newGarageId = req.body.garageID;
    const owner = req.session.userId;

    const existingGarage = await garageModel.findOne({
      owner: owner,
      _id: newGarageId,
    });

    if (!existingGarage)
      return res.status(204).json({ message: "that garage doesn't exist" });

    let modelCar = await possibleCarModel.findOne(
      { name: newCarName },
      "-_id -__v"
    );

    if (!modelCar)
      return res.status(204).json({
        message: "that car doesn't exist",
      });

    const newCar = await carModel.create({
      name: modelCar.name,
      manufacturer: modelCar.manufacturer,
      price: modelCar.price,
      class: modelCar.class,
      garage: existingGarage._id,
      owner: owner,
    });

    await userModel.updateOne(
      { _id: owner },
      { $addToSet: { cars: newCar._id } },
      (err) => {
        if (err) return console.log(err);
      }
    );

    await garageModel.updateOne(
      { _id: newGarageId },
      { $addToSet: { cars: newCar._id } },
      (err) => {
        if (err) return console.log(err);
      }
    );

    const confirmCar = await carModel
      .findOne({ _id: newCar._id })
      .populate("garage");

    if (!confirmCar) {
      console.log("saved car cannot be found");
      return res
        .status(500)
        .json({ message: "server error, car was not saved" });
    }

    console.log(
      `\n@ ${date.toLocaleDateString()} - ${date.toLocaleTimeString()}\n  Car added\n    ${
        confirmCar.name
      }\n    ${confirmCar.garage.name} - ${
        confirmCar.garage.desc
      }\n    ${owner}`
    );

    res.status(201).json({
      name: confirmCar.name,
      garage: {
        name: confirmCar.garage.name,
        desc: confirmCar.garage.desc,
        ID: confirmCar.garage.ID,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const rmCar = async (req, res, next) => {
  // Removes a car

  try {
    const carToDeleteId = req.params.car_id;
    const owner = req.session.userId;

    const carToDelete = await carModel.findOne({
      _id: carToDeleteId,
      owner: owner,
    });

    if (!carToDelete)
      return res.status(400).json({ error: `That car doesn't exist.` });

    const test = await userModel.updateOne(
      { _id: owner },
      { $pull: { cars: carToDelete._id } }
    );

    if (!test.nModified) {
      console.log("failed to delete car from user document");
      return res.status(500).json({ error: "deleting failed" });
    }

    const test2 = await garageModel.updateOne(
      {
        cars: carToDelete._id,
      },
      { $pull: { cars: carToDelete._id } }
    );

    if (!test2.nModified) {
      console.log("failed to delete car from garage document");
      return res.status(500).json({ error: "deleting failed" });
    }

    const deletedCar = await carModel
      .findOneAndDelete({ _id: carToDeleteId })
      .populate("garage");

    if (!deletedCar) {
      console.log("failed at the last deleting step");
      console.log("car:", carToDelete);
      return res.status(500).json({ error: "deleting failed" });
    }

    res.status(200).json(`deleted`);

    console.log(
      `\n@ ${date.toLocaleDateString()} - ${date.toLocaleTimeString()}\n  Car deleted\n    ${
        deletedCar.name
      }\n    ${deletedCar.garage.name} - ${
        deletedCar.garage.desc
      }\n    ${owner}`
    );
  } catch (err) {
    console.log("error at car controller, remove car: ", err);
  }
};

export const moveCar = async (req, res, next) => {
  // Moves a car

  let time = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

  try {
    const cars = req.body.cars;
    const to = req.body.newGarageID;
    const owner = req.session.userId;

    if (!cars || !to) return res.status(400).send();

    let newGarage = await getGarageById(to, owner);
    if (newGarage.error) return res.status(400).json(newGarage);

    let errors = [];
    let movedCars = [];
    let toSendMovedCars = [];
    let toSendErrorCars = [];

    for (const car of cars) {
      const foundCar = await carModel
        .findOne({ _id: car._id, owner: owner })
        .populate("garage");

      if (!foundCar) {
        errors.push({
          time,
          message: "Car not found",
          car,
          requester: owner,
        });
        toSendErrorCars.push(car);
        continue;
      }

      if (foundCar.garage._id.toString() === to.toString()) {
        errors.push({
          time,
          message: "Car already in garage",
          car,
          requester: owner,
        });
        toSendErrorCars.push(car);
        continue;
      }

      const oldGarage = await garageModel.findOneAndUpdate(
        { _id: foundCar.garage, owner: owner },
        { $pull: { cars: foundCar._id } },
        { new: true }
      );

      if (!oldGarage) {
        errors.push({
          time,
          message: "Old garage not found",
          car,
          requester,
        });
        toSendErrorCars.push(car);
        continue;
      }

      const newCar = await carModel
        .findOneAndUpdate(
          { _id: car._id, owner: owner },
          {
            $set: { garage: newGarage._id },
          },
          { new: true }
        )
        .populate("garage");

      if (!newCar) {
        errors.push({
          time,
          message: "Updated car not found",
          car,
          requester: owner,
        });
        toSendErrorCars.push(car);
        continue;
      }

      const newGarage2 = await garageModel.findOneAndUpdate(
        { _id: to, owner: owner },
        { $addToSet: { cars: newCar._id } }
      );

      if (!newGarage2) {
        errors.push({
          time,
          message: "Car adding to new garage failed",
          car,
          requester: owner,
        });
        toSendErrorCars.push(car);
        continue;
      }

      movedCars.push({
        _id: foundCar._id,
        name: foundCar.name,
        from: {
          gName: foundCar.garage.name,
          gDesc: foundCar.garage.desc,
        },
        to: {
          gName: newCar.garage.name,
          gDesc: newCar.garage.desc,
        },
        owner: foundCar.owner,
      });

      toSendMovedCars.push(newCar);
    }

    if (errors.length === cars.length) {
      console.log(`\nEvery car failed to move\n`);
      for (const error of errors) {
        console.log(error);
      }
      return res
        .status(200)
        .json({ status: "none", errorCars: toSendErrorCars });
    }

    if (errors.length) {
      console.log(
        `\n@ ${time}\n  MOVE ERROR\n    Some cars made it through, heres the errors:`
      );

      for (const error of errors) {
        console.log(error);
      }
    }

    movedCars.forEach((car) => {
      console.log(
        `\n@ ${time}\n  MOVED\n    ${car.name}\n\n    from: ${car.from.gName} - ${car.from.gDesc}\n    to: ${car.to.gName} - ${car.to.gDesc}\n    owner: ${car.owner}`
      );
    });

    console.log(`\nMoved ${movedCars.length} cars`);

    if (toSendMovedCars.length && toSendErrorCars.length) {
      return res.status(200).json({
        status: "some",
        movedCars: toSendMovedCars,
        errorCars: toSendErrorCars,
      });
    }

    res.status(200).json({
      status: "every",
      movedCars: toSendMovedCars,
      errorCars: toSendErrorCars,
    });
  } catch (err) {
    console.log(err);
  }
};

export const searchCar = async (req, res, next) => {
  // Gives the car(s) that matches with the query

  try {
    const searchQuery = req.query.q.toLowerCase();
    const owner = req.session.userId;

    if (!searchQuery) return res.status(400).json({ error: `Empty query` });

    let cars = await carModel.find({ owner: owner }, "-_id -__v");

    let toSend = cars.filter(
      (car) =>
        car.name.includes(searchQuery) ||
        car.garage.name.includes(searchQuery) ||
        car.garage.desc.includes(searchQuery) ||
        car.name.startsWith(searchQuery)
    );

    if (!toSend.length) {
      return res.status(204).json({ message: "No cars found" });
    }

    if (toSend.length > 20) {
      toSend = toSend.slice(0, 21);
    }

    return res.status(200).json(toSend);
  } catch (err) {
    console.log(err);
  }
};

export const possibleCars = async (req, res, next) => {
  try {
    let searchQuery = req.query.q.toLowerCase();

    if (!searchQuery) return res.status(400).json({ error: `Empty query` });

    let query = possibleCarModel.find({}, "-_id -__v -iamges -topSpeed -price");

    query = query.regex("name", new RegExp(searchQuery, "i"));

    let results = await query.exec();

    if (results.length > 10) {
      results = results.slice(0, 11);
    }

    return res.status(200).json({ possibleCars: results });
  } catch (err) {
    console.log(err);
  }
};
