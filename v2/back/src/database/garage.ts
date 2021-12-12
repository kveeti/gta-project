import { ObjectId } from "mongoose";
import { Garage } from "../models/garage";
import { ModelGarage } from "../models/ModelGarage";
import { mongo } from "../mongo";
import { simplifyGarages } from "../util/simplify";

export const get = {
  all: async (owner: ObjectId) => {
    const garages = await mongo.garages.get.all(owner);

    if (!garages.length) return [];

    return simplifyGarages(garages);
  },

  one: async (id: string, owner: ObjectId) => {
    const res = await mongo.garages.get.one(id, owner);

    if (isModelGarage(res.modelGarage))
      return {
        _id: res._id,
        modelGarage: res.modelGarage as ModelGarage,
        owner: res.owner,
      };

    console.log("db.garages.get.one, res.modelGarage was not a valid modelGarage");

    return null;
  },

  byModelGarageId: async (modelGarageId: ObjectId, owner: ObjectId) => {
    const res = await mongo.garages.get.byModelGarageId(modelGarageId, owner);

    return res;
  },
};

export const set = {
  desc: async (id: ObjectId, desc: string) => {
    return await mongo.garages.set.desc(id, desc);
  },
};

export const cars = {
  add: async (garageId: ObjectId, carId: ObjectId, owner: ObjectId) => {
    return mongo.garages.cars.add(garageId, carId, owner);
  },

  remove: async (garageId: ObjectId, carId: ObjectId, owner: ObjectId) => {
    return mongo.garages.cars.remove(garageId, carId, owner);
  },
};

export const create = async (garage: Garage) => {
  const newGarageId = await mongo.garages.create(garage);

  return newGarageId;
};

const isModelGarage = (obj: ModelGarage | any): obj is ModelGarage => {
  return obj && obj.name && typeof obj.name === "string";
};
