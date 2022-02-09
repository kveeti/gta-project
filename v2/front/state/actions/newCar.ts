import { constants } from "../actionTypes";

export const setInput = {
  car: (input: any) => {
    return {
      type: constants.new.car.setInput.CAR,
      payload: input,
    };
  },
  garage: (input: any) => {
    return {
      type: constants.new.car.setInput.GARAGE,
      payload: input,
    };
  },
};
