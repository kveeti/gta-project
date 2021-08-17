import {
  MOVE_CAR_CHECK_CHOSEN_GARAGE,
  MOVE_CAR_CHECK_ERROR_CAR,
  MOVE_CAR_CHECK_MOVE_LIST,
  MOVE_CAR_CLEAR,
  MOVE_CAR_CLEAR_MOVE_LIST,
  MOVE_CAR_FORCE_IS_MOVING,
  MOVE_CAR_IS_MOVING,
  MOVE_CAR_SET_GARAGES,
  MOVE_CAR_SET_GARAGE_INPUT,
} from "../constants/actionTypes";

const init = {
  carsToMove: [],
  errorCars: [],
  isMoving: false,
  garageId: "",
  garageInput: "",
  garages: [],
  chosenGarage: null,
};

const moveCarReducer = (state = init, action) => {
  switch (action.type) {
    case MOVE_CAR_CHECK_MOVE_LIST:
      if (
        !state.carsToMove.filter((car) => car._id === action.payload._id).length
      ) {
        return { ...state, carsToMove: [...state.carsToMove, action.payload] };
      }
      return {
        ...state,
        carsToMove: state.carsToMove.filter(
          (car) => car._id !== action.payload._id
        ),
      };

    case MOVE_CAR_CLEAR:
      return init;

    case MOVE_CAR_CLEAR_MOVE_LIST:
      return { ...state, carsToMove: [] };

    case MOVE_CAR_IS_MOVING:
      return { ...state, isMoving: !state.isMoving };

    case MOVE_CAR_FORCE_IS_MOVING:
      return { ...state, isMoving: action.payload };

    case MOVE_CAR_SET_GARAGES:
      return { ...state, garages: action.payload };

    case MOVE_CAR_SET_GARAGE_INPUT:
      return { ...state, garageInput: action.payload };

    case MOVE_CAR_CHECK_CHOSEN_GARAGE:
      if (!state.chosenGarage) {
        return { ...state, chosenGarage: action.payload };
      }
      return {
        ...state,
        chosenGarage: null,
      };

    case MOVE_CAR_CHECK_ERROR_CAR:
      if (
        !state.errorCars.filter((car) => car._id === action.payload._id).length
      ) {
        return { ...state, errorCars: [...state.errorCars, action.payload] };
      }
      return {
        ...state,
        errorCars: state.errorCars.filter(
          (car) => car._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export default moveCarReducer;
