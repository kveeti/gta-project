import { SET_NEW_GARAGE_DESC } from "../constants/actionTypes";

const newGarageDescReducer = (input = "", action) => {
  switch (action.type) {
    case SET_NEW_GARAGE_DESC:
      return action.payload;

    default:
      return input;
  }
};

export default newGarageDescReducer;
