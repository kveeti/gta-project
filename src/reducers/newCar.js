import {
  NEWCAR_SET_CAR_NAME,
  NEWCAR_SET_GARAGE_NAME,
  NEWCAR_SET_POSSIBLE_CARS,
  NEWCAR_SET_GARAGES,
  NEWCAR_CHECK_CHOSEN_GARAGE,
  NEWCAR_CHECK_CHOSEN_POSSIBLE_CAR,
  NEWCAR_CLEAR_ALL,
} from "../constants/actionTypes.js";

const init = {
  carName: "",
  garageName: "",
  possibleCars: [],
  garages: [],
  chosenGarage: null,
  chosenPossibleCar: null,
};

const newCarReducer = (state = init, action) => {
  switch (action.type) {
    case NEWCAR_SET_CAR_NAME:
      return { ...state, carName: action.payload };

    case NEWCAR_SET_GARAGE_NAME:
      return { ...state, garageName: action.payload };

    case NEWCAR_SET_POSSIBLE_CARS:
      return { ...state, possibleCars: action.payload };

    case NEWCAR_SET_GARAGES:
      return { ...state, garages: action.payload };

    case NEWCAR_CHECK_CHOSEN_GARAGE:
      if (!state.chosenGarage) {
        return { ...state, chosenGarage: action.payload };
      }
      return {
        ...state,
        chosenGarage: null,
      };

    case NEWCAR_CHECK_CHOSEN_POSSIBLE_CAR:
      if (!state.chosenPossibleCar) {
        return { ...state, chosenPossibleCar: action.payload };
      }
      return {
        ...state,
        chosenPossibleCar: null,
      };

    case NEWCAR_CLEAR_ALL:
      return init;

    default:
      return state;
  }
};

export default newCarReducer;
