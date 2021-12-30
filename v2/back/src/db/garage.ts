import { ObjectId } from "mongoose";
import { Garage, GarageModel } from "../models/garage";
import { ModelGarage } from "../models/ModelGarage";

export const get = {
  all: async (owner: ObjectId) => {
    const garages = await GarageModel.find({ owner })
      .select("-__v")
      .populate("modelGarage")
      .populate("owner");

    return garages;
  },

  one: async (id: string, owner: ObjectId) => {
    const one = await GarageModel.findOne({ _id: id, owner })
      .select("-_id -__v")
      .populate("modelGarage")
      .populate("owner");

    if (!one) return null;

    if (isModelGarage(one.modelGarage))
      return {
        _id: one._id,
        modelGarage: one.modelGarage as ModelGarage,
        owner: one.owner,
      };

    console.log("db.garages.get.one, one.modelGarage was not a valid modelGarage");

    return null;
  },

  byModelGarageId: async (modelGarageId: ObjectId, owner: ObjectId) => {
    const one = await GarageModel.findOne({ modelGarage: modelGarageId, owner }).select("-__v");

    return one;
  },
};

export const set = {
  desc: async (id: ObjectId, desc: string) => {
    return await GarageModel.updateOne({ _id: id }, { $set: { desc } });
  },
};

export const cars = {
  add: async (garageId: ObjectId, carId: ObjectId, owner: ObjectId) => {
    return await GarageModel.updateOne({ _id: garageId, owner }, { $addToSet: { cars: carId } });
  },

  remove: async (garageId: ObjectId, carId: ObjectId, owner: ObjectId) => {
    return await GarageModel.updateOne({ _id: garageId, owner }, { $pull: { cars: carId } });
  },
};

export const create = async (garage: Garage) => {
  return await new GarageModel(garage).save();
};

const isModelGarage = (obj: ModelGarage | any): obj is ModelGarage => {
  return obj && obj.name && typeof obj.name === "string";
};
