import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.new.garage, action: any) => {
  switch (action.type) {
    case constants.new.garage.set.CHOSEN_GARAGE:
      return {
        ...state,
        chosenGarage: action.payload,
      };

    /*
    MATCHING
    */
    case constants.new.garage.set.garages.MATCHING:
      return {
        ...state,
        garages: {
          ...state.garages,
          matching: action.payload,
        },
      };

    // MATCHING API
    case constants.new.garage.set.garages.api.LOADING:
      return {
        ...state,
        garages: {
          ...state.garages,
          api: {
            ...state.garages.api,
            loading: action.payload,
          },
        },
      };

    case constants.new.garage.set.garages.api.ERROR:
      return {
        ...state,
        garages: {
          ...state.garages,
          api: {
            ...state.garages.api,
            error: action.payload,
          },
        },
      };

    /*
    API
    */
    case constants.new.garage.set.api.SAVING:
      return {
        ...state,
        api: {
          ...state.api,
          saving: action.payload,
        },
      };

    case constants.new.garage.set.api.ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          error: action.payload,
        },
      };

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
