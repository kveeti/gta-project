import { ObjectId } from "mongoose";
import { ModelCarModel } from "../models/ModelCar";

export const get = {
  one: async (id: ObjectId) => {
    return await ModelCarModel.findOne({ _id: id }).select("-__v");
  },

  all: async () => {
    return await ModelCarModel.find({}).select("-__v");
  },
};
