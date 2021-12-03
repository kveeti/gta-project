import {
  SEARCH_SET_CARS,
  SEARCH_SET_GARAGES,
  SEARCH_SET_INPUT,
  SET_NO_RESULTS,
} from "../constants/actionTypes.js";

const init = {
  input: "",
  cars: [],
  garages: [],
  noResults: false,
};

const searchReducer = (state = init, action) => {
  switch (action.type) {
    case SEARCH_SET_CARS:
      return { ...state, cars: action.payload };

    case SEARCH_SET_GARAGES:
      return { ...state, garages: action.payload };

    case SEARCH_SET_INPUT:
      return { ...state, input: action.payload };

    case SET_NO_RESULTS:
      return { ...state, noResults: action.payload };

    default:
      return state;
  }
};

export default searchReducer;
