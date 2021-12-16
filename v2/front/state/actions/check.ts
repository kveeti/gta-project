import { ICar } from "../../interfaces/Car";
import { constants } from "../actionTypes";

export const car = (car: ICar) => {
  return {
    type: constants.check.CAR,
    payload: car,
  };
};
