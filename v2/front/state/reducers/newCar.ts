import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.new.car, action: any) => {
  switch (action.type) {
    /*
    INPUTS
    */
    case constants.new.car.setInput.CAR:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          cars: action.payload,
        },
      };

    case constants.new.car.setInput.GARAGE:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          garage: action.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
