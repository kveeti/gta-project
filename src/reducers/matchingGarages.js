import { CLEAR_GARAGES, SEARCH_GARAGES } from "../constants/actionTypes";

const matchingGaragesReducer = (matchingGarages = [], action) => {
  switch (action.type) {
    case SEARCH_GARAGES:
      return action.payload;

    case CLEAR_GARAGES:
      return [];
    default:
      return matchingGarages;
  }
};

export default matchingGaragesReducer;
