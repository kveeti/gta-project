import { ObjectId } from "mongoose";
import { GarageModel } from "../models/garage";

export const get = {
  all: async (owner: string) => {
    return await GarageModel.find({ owner }).select("-_id -__v");
  },
};

export const set = {
  desc: async (id: ObjectId, desc: string) => {
    return await GarageModel.updateOne({ _id: id }, { $set: { desc } });
  },
};
