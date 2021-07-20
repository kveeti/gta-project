import { SET_GARAGE_INPUT } from "../constants/actionTypes.js";

const garageInputReducer = (garageInput = "", action) => {
  switch (action.type) {
    case SET_GARAGE_INPUT:
      return action.payload;
    default:
      return garageInput;
  }
};

export default garageInputReducer;
