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
    const res = await CarModel.find({ garage, owner })
      .select("-__v")
      .populate("modelCar")
      .populate("owner")
      .populate({
        path: "garage",
        populate: [{ path: "modelGarage" }],
      });

    const garages = res.map((garage) => {
      if (isModelCar(garage.modelCar)) {
        return {
          id: garage._id,
          modelCar: garage.modelCar as ModelCar,
          owner: garage.owner,
        };
      }

      return null;
    });

    if (garages.includes(null)) {
      console.log("db.cars.get.all, a car was not a vaild modelCar");
      return null;
    }

    return garages;
  },

  all: async (owner: ObjectId) => {
    const cars = await CarModel.find({ owner })
      .select("-__v")
      .populate("modelCar")
      .populate("owner")
      .populate({
        path: "garage",
        populate: [{ path: "modelGarage" }],
      });

    return cars;
  },
};

export const setGarage = async (id: ObjectId, garage: ObjectId) => {
  await CarModel.updateOne({ _id: id }, { garage });
};

export const create = async (car: Car) => {
  return await new CarModel(car).save();
};

export const remove = async (id: ObjectId, owner: ObjectId) => {
  await CarModel.deleteOne({ _id: id, owner });
};
