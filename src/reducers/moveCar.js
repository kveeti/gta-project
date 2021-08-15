import {
  CHECK_MOVE_LIST,
  CLEAR_MOVE_LIST,
  FORCE_IS_MOVING,
  IS_MOVING,
} from "../constants/actionTypes";

const init = {
  carsToMove: [],
  isMoving: false,
  garageId: "",
};

const moveCarReducer = (state = init, action) => {
  switch (action.type) {
    case CHECK_MOVE_LIST:
      if (
        !state.carsToMove.filter((car) => car._id === action.payload._id).length
      ) {
        return { ...state, carsToMove: [action.payload] };
      }
      return {
        ...state,
        carsToMove: state.carsToMove.filter(
          (car) => car._id !== action.payload._id
        ),
      };

    case CLEAR_MOVE_LIST:
      return { ...state, carsToMove: [] };

    case IS_MOVING:
      return { ...state, isMoving: !state.isMoving };

    case FORCE_IS_MOVING:
      return { ...state, isMoving: action.payload };

    default:
      return state;
  }
};

export default moveCarReducer;
