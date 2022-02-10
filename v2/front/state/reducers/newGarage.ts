import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.new.garage, action: any) => {
  switch (action.type) {
    /*
    INPUTS
    */
    case constants.new.garage.set.input.GARAGE:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          garage: action.payload,
        },
      };

    case constants.new.garage.set.input.DESC:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          desc: action.payload,
        },
      };

    case constants.new.garage.RESET:
      return initState.new.garage;

    default:
      return state;
  }
};

export default reducer;
