import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.checked, action: any) => {
  switch (action.type) {
    case constants.check.CAR:
      // if car is already checked, return a filtered array without the car
      console.log("already checked " + state.cars.some((car) => car === action.payload));

      if (state.cars.some((car) => car === action.payload))
        return {
          ...state,
          cars: state.cars.filter((car) => car !== action.payload),
        };

      // if car is not checked add the car to the array and return the new array
      return {
        ...state,
        cars: [...state.cars, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
