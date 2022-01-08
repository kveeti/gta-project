import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.checked, action: any) => {
  switch (action.type) {
    case constants.checked.CHECK_CAR:
      // if car is already checked, return a filtered array without the car
      if (state.cars.some((car) => car.id === action.payload.id))
        return {
          ...state,
          cars: state.cars.filter((car) => car.id !== action.payload.id),
        };

      // if car is not checked add the car to the array and return the new array
      return {
        ...state,
        cars: [...state.cars, action.payload],
      };

    case constants.checked.RESET:
      return initState.checked;

    case constants.checked.SET_SHOW:
      return {
        ...state,
        show: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
