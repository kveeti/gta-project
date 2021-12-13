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

export const upsert = async (owner: string, email: string) => {
  return await UserModel.findOneAndUpdate(
    { owner, email },
    { owner, email },
    { upsert: true, new: true }
  ).select("-__v");
};

export const get = async (owner: string, email: string) => {
  return await UserModel.findOne({ owner, email })
    .select("-__v")
    .populate({
      path: "cars",
      select: "-__v",
      populate: [
        {
          path: "garage",
          select: "-__v",
          populate: [{ path: "modelGarage", select: "-__v" }],
        },
        { path: "modelCar", select: "-__v" },
        { path: "owner", select: "-__v" },
      ],
    })
    .populate({
      path: "garages",
      select: "-__v",
      populate: [
        { path: "modelGarage", select: "-__v" },
        { path: "owner", select: "-__v" },
      ],
    });
};
