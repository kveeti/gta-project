import {
  GARAGE_PAGE,
  GARAGE_PAGE_CLEAR,
  GARAGE_PAGE_SET_DESC,
  GARAGE_PAGE_SET_NAME,
} from "../constants/actionTypes.js";

const initialState = {
  garageName: "",
  garageDesc: "",
  garageID: null,
  garageNameInput: "",
  garageDescInput: "",
  cars: [],
};

const garageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GARAGE_PAGE:
      return action.payload;

    case GARAGE_PAGE_CLEAR:
      return initialState;

    case GARAGE_PAGE_SET_NAME:
      return { ...state, garageNameInput: action.payload };

    case GARAGE_PAGE_SET_DESC:
      return { ...state, garageDescInput: action.payload };

    default:
      return initialState;
  }
};

export default garageReducer;
