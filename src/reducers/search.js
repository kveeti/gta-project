import {
  SEARCH_SET_CARS,
  SEARCH_SET_GARAGES,
  SEARCH_SET_INPUT,
} from "../constants/actionTypes.js";

const init = {
  input: "",
  cars: [],
  garages: [],
};

const searchReducer = (state = init, action) => {
  switch (action.type) {
    case SEARCH_SET_CARS:
      return { ...state, cars: action.payload };

    case SEARCH_SET_GARAGES:
      return { ...state, garages: action.payload };

    case SEARCH_SET_INPUT:
      return { ...state, input: action.payload };

    default:
      return state;
  }
};

export default searchReducer;
