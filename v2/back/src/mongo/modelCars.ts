import { ObjectId } from "mongoose";
import { ModelCarModel } from "../models/ModelCar";

export const get = {
  one: async (id: ObjectId) => {
    const res = await ModelCarModel.findOne({ _id: id }).select("-__v");

    return res;
  },

  all: async () => {
    return await ModelCarModel.find({}).select("-__v");
  },
};
