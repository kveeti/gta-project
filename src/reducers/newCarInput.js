import { SET_NEWCAR_INPUT } from "../constants/actionTypes";

const newCarInputReducer = (newCarInput = "", action) => {
  switch (action.type) {
    case SET_NEWCAR_INPUT:
      return action.payload;

    default:
      return newCarInput;
  }
};

export default newCarInputReducer;
