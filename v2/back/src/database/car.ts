import { ObjectId } from "mongoose";
import { Car } from "../models/car";
import { mongo } from "../mongo";

export const get = {
  byId: async (id: ObjectId) => {
    return await mongo.cars.get.byId(id);
  },

  byName: async (name: string, owner: string) => {
    return await mongo.cars.get.byName(name, owner);
  },

  byGarage: async (garage: ObjectId, owner: string) => {
    return await mongo.cars.get.byGarage(garage, owner);
  },

  all: async (owner: string) => {
    return await mongo.cars.get.all(owner);
  },
};

export const move = async (car: Car, garage: ObjectId) => {
  return await mongo.cars.setGarage(car._id, garage);
};

export const create = async (car: Car) => {
  return await mongo.cars.create(car);
};
