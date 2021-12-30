import { ObjectId } from "mongoose";
import { Auth } from "../interfaces/Auth";
import { UserModel } from "../models/user";

export const add = async (owner: string, email: string) => {
  await new UserModel({ owner, email, cars: [], garages: [] }).save();
};

export const cars = {
  add: async (carId: ObjectId, auth: Auth) => {
    return await UserModel.updateOne(
      { _id: auth.dbId, owner: auth.userId },
      { $addToSet: { cars: carId } }
    );
  },

  remove: async (carId: ObjectId, auth: Auth) => {
    return await UserModel.updateOne(
      { _id: auth.dbId, owner: auth.userId },
      { $pull: { cars: carId } }
    );
  },
};

export const garages = {
  add: async (garageId: ObjectId, auth: Auth) => {
    return await UserModel.updateOne(
      { _id: auth.dbId, owner: auth.userId },
      { $addToSet: { garages: garageId } }
    );
  },

  remove: async (garageId: ObjectId, auth: Auth) => {
    return await UserModel.updateOne(
      { _id: auth.dbId, owner: auth.userId },
      { $pull: { garages: garageId } }
    );
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
