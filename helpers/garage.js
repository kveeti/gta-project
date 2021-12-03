import { garageModel } from "../models";

export const getGarageById = async (garageID, owner) => {
  let garage = await garageModel.findOne({ _id: garageID, owner: owner });

  if (!garage) return { error: `No garage exists with an id of ${garageID}` };

  return garage;
};
