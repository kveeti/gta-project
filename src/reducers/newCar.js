import {
  NEWCAR_SET_CAR_NAME,
  NEWCAR_SET_GARAGE_NAME,
  NEWCAR_SET_GARAGE_ID,
  NEWCAR_SET_POSSIBLE_CARS,
  NEWCAR_SET_GARAGES,
  //   NEWCAR_BAD_GARAGE,
  //   NEWCAR_BAD_CAR,
} from "../constants/actionTypes.js";

const init = {
  carName: "",
  garageName: "",
  garageId: null,
  possibleCars: [],
  garages: [],
  //   badName: false,
  //   badGarage: false,
};

const newCarReducer = (state = init, action) => {
  switch (action.type) {
    case NEWCAR_SET_CAR_NAME:
      return { ...state, carName: action.payload };

    case NEWCAR_SET_GARAGE_NAME:
      return { ...state, garageName: action.payload };

    case NEWCAR_SET_GARAGE_ID:
      return { ...state, garageId: action.payload };

    case NEWCAR_SET_POSSIBLE_CARS:
      return { ...state, possibleCars: action.payload };

    case NEWCAR_SET_GARAGES:
      return { ...state, garages: action.payload };

    /* case NEWCAR_BAD_GARAGE:
      return { ...state, badName: action.payload };

    case NEWCAR_BAD_CAR:
      return { ...state, badGarage: action.payload }; */

    default:
      return state;
  }
};

export default newCarReducer;
