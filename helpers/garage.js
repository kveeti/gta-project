import { garageModel } from "../models";

export const getGarageById = async (garageID, owner) => {
  let garage = await garageModel.findOne(
    { ID: garageID, owner: owner },
    "-_id -__v -garageID"
  );

  if (!garage) return { error: `No garage exists with an id of ${garageID}` };

  return garage;
};
