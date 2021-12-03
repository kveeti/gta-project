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

  if (!user) return res.status(401).send();

  let toSend = {};

  let carsToSend = user.cars.filter(
    (car) =>
      car.name.includes(searchQuery) ||
      car.manufacturer.includes(searchQuery) ||
      car.garage.name.includes(searchQuery) ||
      car.garage.desc.includes(searchQuery) ||
      car.name.startsWith(searchQuery)
  );

  if (carsToSend.length > 20) {
    carsToSend = carsToSend.slice(0, 21);
  }

  toSend.cars = carsToSend;

  let garagesToSend = user.garages.filter(
    (garage) =>
      garage.name.startsWith(searchQuery) ||
      garage.name.includes(searchQuery) ||
      garage.desc.includes(searchQuery)
  );

  if (garagesToSend.length > 2) {
    garagesToSend = garagesToSend.slice(0, 3);
  }

  toSend.garages = garagesToSend;

  if (!toSend.garages.length && !toSend.cars.length) {
    return res.status(200).json({ ...toSend, status: 204 });
  }

  res.status(200).json(toSend);
};
