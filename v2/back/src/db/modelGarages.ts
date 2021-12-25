import { ObjectId } from "mongoose";
import { mongo } from "../mongo";

export const get = {
  one: async (id: ObjectId) => {
    const res = await mongo.possibleGarages.get.one(id);

    return res;
  },

  all: async () => {
    const res = await mongo.possibleGarages.get.all();

    return res;
  },
};
