import { PopulatedGarage } from "../models/garage";
import { ModelCar } from "../models/ModelCar";
import { ModelGarage } from "../models/ModelGarage";
import { PopulatedUser } from "../models/user";

export const isModelCar = (obj: ModelCar | any): obj is ModelCar => {
  return obj && obj.name && typeof obj.name === "string";
};

export const isPopulatedGarage = (obj: PopulatedGarage | any): obj is PopulatedGarage => {
  return obj && obj.desc !== undefined && typeof obj.desc === "string";
};

export const isModelGarage = (obj: ModelGarage | any): obj is ModelGarage => {
  return obj && obj.name && typeof obj.name === "string";
};

export const isPopulatedUser = (obj: PopulatedUser | any): obj is PopulatedUser => {
  return obj && obj.owner && typeof obj.owner === "string";
};
