import { userModel } from "../models";

export const search = async (req, res) => {
  const searchQuery = req.query.q.toLowerCase().trim();
  const owner = req.session.userId;

  let matchingGarages;
  let matchingCars;

  const user = await userModel
    .findOne({ _id: owner })
    .populate({
      path: "cars",
      select: "name class manufacturer price",
      populate: {
        path: "garage",
        select: "name desc cars",
      },
    })
    .populate("garages");

  matchingCars = user.cars;
  matchingGarages = user.garages;

  let toSend = {};

  if (matchingCars.length) {
    let carsToSend = matchingCars.filter(
      (car) =>
        car.name.includes(searchQuery) ||
        car.garage.name.includes(searchQuery) ||
        car.garage.desc.includes(searchQuery) ||
        car.name.startsWith(searchQuery)
    );

    if (carsToSend.length > 20) {
      carsToSend = carsToSend.slice(0, 21);
    }

    toSend.cars = carsToSend;
  }

  if (matchingGarages.length) {
    let garagesToSend = matchingGarages.filter(
      (garage) =>
        garage.name.startsWith(searchQuery) ||
        garage.name.includes(searchQuery) ||
        garage.desc.includes(searchQuery)
    );

    if (garagesToSend > 10) {
      garagesToSend = garagesToSend.slice(0, 11);
    }

    toSend.garages = garagesToSend;
  }

  if (!toSend)
    return res.status(204).json({ message: "Didn't found anything" });

  res.status(200).json(toSend);
};
