import { ObjectId } from "mongoose";
import { UserModel } from "../models/user";

export const add = {
  car: async (carId: ObjectId, owner: string, dbId: ObjectId) => {
    return await UserModel.updateOne({ _id: dbId, owner }, { $addToSet: { cars: carId } });
  },

  garage: async (garageId: ObjectId, owner: string, dbId: ObjectId) => {
    return await UserModel.updateOne({ _id: dbId, owner }, { $addToSet: { garages: garageId } });
  },

  user: async (owner: string, email: string) => {
    await new UserModel({ owner, email, cars: [], garages: [] }).save();
  },
};

export const remove = {
  car: async (carId: ObjectId, owner: string, dbId: ObjectId) => {
    return await UserModel.updateOne({ _id: dbId, owner }, { $pull: { cars: carId } });
  },

  garage: async (garageId: ObjectId, owner: string, dbId: ObjectId) => {
    return await UserModel.updateOne({ _id: dbId, owner }, { $pull: { garages: garageId } });
  },
};

export const get = async (owner: string, email: string) => {
  return await UserModel.findOneAndUpdate(
    { owner, email },
    { owner, email },
    { upsert: true, new: true }
  ).select("-__v");
};
