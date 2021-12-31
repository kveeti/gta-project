import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.move, action: any) => {
  switch (action.type) {
    /*
    MATCHING GARAGES
    */
    case constants.move.matchingGarages.SET:
      return {
        ...state,
        matchingGarages: {
          ...state.matchingGarages,
          matching: action.payload,
        },
      };

    case constants.move.matchingGarages.api.SET_LOADING:
      return {
        ...state,
        matchingGarages: {
          ...state.matchingGarages,
          api: {
            ...state.matchingGarages.api,
            loading: action.payload,
          },
        },
      };

    case constants.move.matchingGarages.api.SET_ERROR:
      return {
        ...state,
        matchingGarages: {
          ...state.matchingGarages,
          api: {
            ...state.matchingGarages.api,
            error: action.payload,
          },
        },
      };

    case constants.move.matchingGarages.api.SET_SUCCESS:
      return {
        ...state,
        matchingGarages: {
          ...state.matchingGarages,
          api: {
            ...state.matchingGarages.api,
            success: action.payload,
          },
        },
      };

    /*
    INPUT
    */
    case constants.move.set.GARAGE_INPUT:
      return {
        ...state,
        garageInput: action.payload,
      };

    case constants.move.set.CHOSEN_GARAGE:
      return {
        ...state,
        chosenGarage: action.payload,
      };

    /*
    MOVE API
    */
    case constants.move.api.SET_SAVING:
      return {
        ...state,
        api: {
          ...state.api,
          loading: action.payload,
        },
      };

    case constants.move.api.SET_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          error: action.payload,
        },
      };

    case constants.move.api.SET_SUCCESS:
      return {
        ...state,
        api: {
          ...state.api,
          success: action.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
