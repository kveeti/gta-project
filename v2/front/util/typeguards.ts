import { ModelGarage } from "../interfaces/Garage";

export const isModelGarage = (obj: ModelGarage | any): obj is ModelGarage => {
  return obj && typeof obj.alreadyOwned === "boolean";
};
