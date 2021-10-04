import { carModel, garageModel, userModel } from "../models";

export const newGarage = async (req, res) => {
  // Adds a garage
  const name = req.body.name.toLowerCase().trim();
  const desc = req.body.desc.toLowerCase().trim();
  const owner = req.session.userId;

  const time = new Date();

  try {
    const newGarage = await garageModel.create({
      name: name,
      desc: desc,
      owner: owner,
    });

    await userModel.updateOne(
      { _id: owner },
      { $addToSet: { garages: newGarage._id } },
      (err) => {
        if (err) console.log(err);
      }
    );

    res.status(201).json({
      newGarage: {
        name: newGarage.name,
        desc: newGarage.desc,
        owner: newGarage.owner,
      },
    });

    console.log(
      `\n@ ${time.toLocaleDateString()} - ${time.toLocaleTimeString()}\n  NEW GARAGE\n    ${name} - ${desc}\n    Owner: ${
        req.locals.user.email
      }\n    Owner id: ${req.locals.user._id}`
    );
  } catch (err) {
    console.log(err);
  }
};

export const rmGarage = async (req, res) => {
  // Removes a garage
  const removeId = req.params.garageId;
  const owner = req.session.userId;

  const time = new Date();

  try {
    const deletedGarage = await garageModel.findOneAndDelete({
      _id: removeId,
      owner: owner,
    });

    if (!deletedGarage)
      return res.status(200).json({ error: "garage does not exist" });

    let carIds = [];

    for (const carToDelete of deletedGarage.cars) {
      carIds.push(carToDelete._id);
    }

    if (carIds.length) {
      await carModel.deleteMany({
        owner: owner,
        _id: carIds,
      });
    }

    await userModel.updateOne(
      { _id: owner },
      { $pull: { garages: deletedGarage._id, cars: { $in: carIds } } }
    );

    res
      .status(200)
      .json({ deleted: { garage: deletedGarage.name, cars: carIds } });

    console.log(
      `\n@ ${time.toLocaleDateString()} - ${time.toLocaleTimeString()}\n  GARAGE DELETE\n    ${
        deletedGarage.name
      }\n    Cars: ${deletedGarage.cars.length}\n    Owner: ${
        req.locals.user.email
      }\n    Owner id: ${req.locals.user._id}`
    );
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

export const getGarage = async (req, res) => {
  // Gives garage(s) with the id param
  const garage_id = req.params.garageId;
  const owner = req.session.userId;

  const garage = await garageModel.findOne({ owner: owner, _id: garage_id });

  if (!garage) {
    return res
      .status(404)
      .json({ message: `No garage with an id of ${garage_id}` });
  }

  res.status(200).json({ garage: garage });
};

export const renameGarage = async (req, res) => {
  let owner;
  let newDesc;
  let garage_id;
  let time = new Date();

  try {
    owner = req.session.userId;
    newDesc = req.body.newDesc.toLowerCase().trim();
    garage_id = req.params.garageId;
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "bad request" });
  }

  try {
    if (!newDesc || !garage_id) {
      return;
    }

    const updated = await garageModel.findOneAndUpdate(
      { _id: garage_id, owner: owner },
      {
        desc: newDesc,
      },
      { new: true }
    );

    if (!updated) {
      res.status(500).json({ message: "garage was not renamed" });
      return;
    }

    console.log(
      `\n@ ${time.toLocaleDateString()} - ${time.toLocaleTimeString()}\n  GARAGE RENAME\n    ${
        updated.name
      }\n    New desc: ${updated.desc}\n    Owner: ${
        req.locals.user.email
      }\n    Owner id: ${req.locals.user._id}`
    );

    res.status(201).send();
  } catch (err) {
    console.log(err);
  }
};

export const searchGarage = async (req, res) => {
  const searchQuery = req.query.q.toLowerCase();
  const owner = req.session.userId;

  const user = await userModel.findOne({ _id: owner }).populate("garages");

  let toSend = user.garages.filter(
    (garage) =>
      garage.name.startsWith(searchQuery) ||
      garage.name.includes(searchQuery) ||
      garage.desc.includes(searchQuery)
  );

  if (toSend.length > 3) {
    toSend = toSend.slice(0, 3);
  }

  return res.status(200).json({ garages: toSend });
};
