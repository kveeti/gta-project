import { CHECK_MOVE_LIST, CLEAR_MOVE_LIST } from "../constants/actionTypes.js";

const carsToMoveReducer = (carsToMove = [], action) => {
  switch (action.type) {
    case CHECK_MOVE_LIST:
      if (!carsToMove.filter((car) => car.ID === action.payload.ID).length) {
        return [...carsToMove, action.payload];
      }
      return carsToMove.filter((car) => car.ID !== action.payload.ID);

    case CLEAR_MOVE_LIST:
      return [];

    default:
      return carsToMove;
  }
};

export default carsToMoveReducer;
