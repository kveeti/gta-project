import { ObjectId } from "mongoose";
import { Car } from "../models/car";
import { ModelCar } from "../models/ModelCar";
import { ModelGarage } from "../models/ModelGarage";
import { mongo } from "../mongo";
import { simplifyCars } from "../util/simplify";
import { isModelCar, isPopulatedGarage, isModelGarage } from "../util/typeguards";

export const get = {
  one: async (id: ObjectId) => {
    const res = await mongo.cars.get.one(id);

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
    const res = await mongo.cars.get.byGarage(garage, owner);

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
    const cars = await mongo.cars.get.all(owner);

    return cars;
  },
};

export const move = async (id: ObjectId, garage: ObjectId) => {
  await mongo.cars.setGarage(id, garage);
};

export const create = async (car: Car) => {
  return await mongo.cars.create(car);
};
