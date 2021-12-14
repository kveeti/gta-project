import { constants } from "../actionTypes";

export const car = (id: string) => {
  return {
    type: constants.check.CAR,
    payload: id,
  };
};
