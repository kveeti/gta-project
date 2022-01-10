import { ModelGarage } from "../interfaces/Garage";

export const isTypeModelGarage = (obj: ModelGarage | any): obj is ModelGarage => {
  return obj && typeof obj.alreadyOwned === "boolean";
};
