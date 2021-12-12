import { Garage } from "../models/garage";
import { mongo } from "../mongo";

export const get = {
  all: async (owner: string) => {
    return await mongo.garages.get.all(owner);
  },
};

export const set = {
  desc: async (garage: Garage, desc: string) => {
    return await mongo.garages.set.desc(garage._id, desc);
  },
};
