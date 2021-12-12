import { ObjectId } from "mongoose";
import { ModelGarageModel } from "../models/ModelGarage";

export const get = {
  one: async (id: ObjectId) => {
    const res = await ModelGarageModel.findOne({ _id: id }).select("-__v");

    return res;
  },

  all: async () => {
    return await ModelGarageModel.find({}).select("-__v");
  },
};
