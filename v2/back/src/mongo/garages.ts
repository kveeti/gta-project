import { ObjectId } from "mongoose";
import { Garage, GarageModel } from "../models/garage";

export const get = {
  all: async (owner: ObjectId) => {
    return await GarageModel.find({ owner })
      .select("-__v")
      .populate("modelGarage")
      .populate("owner");
  },

  one: async (id: string, owner: ObjectId) => {
    return await GarageModel.findOne({ _id: id, owner })
      .select("-_id -__v")
      .populate("modelGarage")
      .populate("owner");
  },

  byModelGarageId: async (modelGarageId: ObjectId, owner: ObjectId) => {
    return await GarageModel.findOne({ modelGarage: modelGarageId, owner }).select("-__v");
  },
};

export const set = {
  desc: async (id: ObjectId, desc: string) => {
    return await GarageModel.updateOne({ _id: id }, { $set: { desc } });
  },
};

export const cars = {
  add: async (garageId: ObjectId, carId: ObjectId, owner: ObjectId) => {
    return GarageModel.updateOne({ _id: garageId, owner }, { $addToSet: { cars: carId } });
  },

  remove: async (garageId: ObjectId, carId: ObjectId, owner: ObjectId) => {
    return GarageModel.updateOne({ _id: garageId, owner }, { $pull: { cars: carId } });
  },
};

export const create = async (garage: Garage) => {
  const newGarage = await new GarageModel(garage).save();

  return newGarage._id;
};
