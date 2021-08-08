import { carModel } from "../models";

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
