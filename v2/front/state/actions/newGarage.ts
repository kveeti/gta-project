import { ModelGarage } from "../../interfaces/Garage";
import { constants } from "../actionTypes";

export const setInput = {
  garage: (value: ModelGarage) => {
    return {
      type: constants.new.garage.set.input.GARAGE,
      payload: value,
    };
  },
  desc: (input: string) => {
    return {
      type: constants.new.garage.set.input.DESC,
      payload: input,
    };
  },
};

export const reset = () => {
  return {
    type: constants.new.garage.RESET,
  };
};
