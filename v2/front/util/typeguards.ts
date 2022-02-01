import { ICar, ModelCar } from "../interfaces/Car";
import { ModelGarage } from "../interfaces/Garage";

export const isTypeModelGarage = (obj: ModelGarage | any): obj is ModelGarage => {
  return obj && typeof obj.alreadyOwned === "boolean";
};

export const isTypeICar = (obj: ICar | any): obj is ICar => {
  return obj && typeof obj?.garage?.name === "string";
};
