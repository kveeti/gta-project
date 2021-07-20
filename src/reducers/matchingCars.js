import { CLEAR_CARS, SEARCH_CARS } from "../constants/actionTypes";

const matchingCarsReducer = (matchingCars = [], action) => {
  switch (action.type) {
    case SEARCH_CARS:
      return action.payload;

    case CLEAR_CARS:
      return [];

    default:
      return matchingCars;
  }
};

export default matchingCarsReducer;
