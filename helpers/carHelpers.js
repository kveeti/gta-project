import { carModel, garageModel } from "../models";

export const getUniqueCarId = async (owner) => {
  let cars = await carModel.find(
    { owner: owner },
    "-_id -__v -carName -garageID -garageName"
  );

  let usedIDs = [];

  let uniqueID;

  cars.forEach((obj) => {
    usedIDs.push(obj.carID);
  });

  do {
    uniqueID = Math.floor(Math.random() * 1000);
  } while (usedIDs.includes(uniqueID));

  return uniqueID;
};

export const getUniqueGarageId = async (owner) => {
  let garages = await garageModel.find({ owner: owner });

  let usedIDs = [0];

  let uniqueID;

  garages.forEach((garage) => {
    usedIDs.push(garage.ID);
  });

  do {
    uniqueID = Math.floor(Math.random() * 100);
  } while (usedIDs.includes(uniqueID));

  return uniqueID;
};

export const getGarageById = async (garageID, owner) => {
  let garage = await garageModel.findOne(
    { ID: garageID, owner: owner },
    "-_id -__v -garageID"
  );

  if (!garage) return { error: `No garage exists with an id of ${garageID}` };

  return garage;
};
