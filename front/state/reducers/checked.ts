import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.checked, action: any) => {
  switch (action.type) {
    case constants.checked.CHECK_CAR:
      // if car is already checked, return a filtered array without the car
      if (state.cars.some((car) => car.id === action.payload.id)) {
        const filtered = state.cars.filter((car) => car.id !== action.payload.id);

        // if there wont be any cars left, hide the selected cars on mobile
        if (!filtered.length) return { ...state, cars: filtered, show: false };

        return {
          ...state,
          cars: filtered,
        };
      }

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

    case constants.checked.SET_CHECKED_CARS:
      return {
        ...state,
        cars: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
