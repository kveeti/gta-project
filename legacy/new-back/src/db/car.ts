import { ObjectId } from "mongoose";
import { Car, CarModel } from "../models/car";
import { ModelCar } from "../models/ModelCar";
import { isModelCar } from "../util/typeguards";

export const get = {
  one: async (id: ObjectId) => {
    const res = await CarModel.findOne({ _id: id })
      .select("-__v")
      .populate("modelCar")
      .populate("owner")
      .populate({
        path: "garage",
        populate: [{ path: "modelGarage" }],
      });

    if (isModelCar(res.modelCar))
      return {
        _id: res._id,
        modelCar: res.modelCar as ModelCar,
        owner: res.owner,
      };

    console.log("db.cars.get.one, res.modelCar was not a valid modelCar");

    return null;
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

  byIds: async (ids: ObjectId[], owner: ObjectId) => {
    return await CarModel.find({ _id: { $in: ids }, owner })
      .select("-__v")
      .populate("modelCar")
      .populate("owner")
      .populate({
        path: "garage",
        populate: [{ path: "modelGarage" }],
      });
  },

  all: async (owner: ObjectId) => {
    const cars = await CarModel.find({ owner })
      .select("-__v")
      .populate("modelCar")
      .populate("owner")
      .populate({
        path: "garage",
        select: "-__v",
        populate: [{ path: "modelGarage", select: "-__v" }],
      });

    return cars;
  },
};

export const setGarage = async (id: ObjectId, owner: ObjectId, garage: ObjectId) => {
  await CarModel.updateOne({ _id: id, owner }, { garage });
};

export const create = async (car: Car) => {
  return await new CarModel(car).save();
};

export const remove = async (id: ObjectId, owner: ObjectId) => {
  await CarModel.deleteOne({ _id: id, owner });
};

export const removeMany = async (ids: ObjectId[], owner: ObjectId) => {
  await CarModel.deleteMany({ _id: { $in: ids }, owner });
};
