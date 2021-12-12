import { ObjectId } from "mongoose";
import { Car, CarModel } from "../models/car";

export const get = {
  one: async (id: ObjectId) => {
    return await CarModel.findOne({ _id: id })
      .select("-__v")
      .populate("modelCar")
      .populate("owner")
      .populate({
        path: "garage",
        populate: [{ path: "modelGarage" }],
      });
  },

  byGarage: async (garage: ObjectId, owner: ObjectId) => {
    return await CarModel.find({ garage, owner })
      .select("-__v")
      .populate("modelCar")
      .populate("owner")
      .populate({
        path: "garage",
        populate: [{ path: "modelGarage" }],
      });
  },

  all: async (owner: ObjectId) => {
    return await CarModel.find({ owner })
      .select("-__v")
      .populate("modelCar")
      .populate("owner")
      .populate({
        path: "garage",
        populate: [{ path: "modelGarage" }],
      });
  },
};

export const setGarage = async (carId: ObjectId, garage: ObjectId) => {
  await CarModel.updateOne({ _id: carId }, { garage });
};

export const create = async (car: Car) => {
  const newCar = await new CarModel(car).save();

  return newCar._id;
};
