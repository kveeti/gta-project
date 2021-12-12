import { ObjectId } from "mongoose";
import { Car, CarModel } from "../models/car";

export const get = {
  byId: async (id: ObjectId) => {
    return await CarModel.find({ _id: id }).select("-_id -__v");
  },

  byName: async (name: string, owner: string) => {
    return await CarModel.find({ name, owner }).select("-_id -__v");
  },

  byGarage: async (garage: ObjectId, owner: string) => {
    return await CarModel.find({ garage, owner }).select("-_id -__v");
  },

  all: async (owner: string) => {
    return await CarModel.find({ owner }).select("-_id -__v");
  },
};

export const setGarage = async (carId: ObjectId, garage: ObjectId) => {
  return await CarModel.updateOne({ _id: carId }, { garage });
};

export const create = async (car: Car) => {
  await new CarModel(car).save();
};
