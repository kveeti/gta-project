import {
  SEARCH_POSSIBLE_CARS,
  CLEAR_POSSIBLE_CARS,
} from "../constants/actionTypes";

const matchingPossibleCarsReducer = (mathingPossibleCars = [], action) => {
  switch (action.type) {
    case SEARCH_POSSIBLE_CARS:
      return action.payload;

    case CLEAR_POSSIBLE_CARS:
      return [];

    default:
      return mathingPossibleCars;
  }
};

export default matchingPossibleCarsReducer;
