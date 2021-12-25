import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.checkedCars, action: any) => {
  switch (action.type) {
    case constants.checkedCars.CHECK:
      // if car is already checked, return a filtered array without the car
      if (state.some((car) => car.id === action.payload.id))
        return state.filter((car) => car.id !== action.payload.id);

      // if car is not checked add the car to the array and return the new array
      return [...state, action.payload];

    case constants.checkedCars.RESET:
      return initState.checkedCars;

    default:
      return state;
  }
};

export default reducer;
