import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.search, action: any) => {
  switch (action.type) {
    case constants.search.SET_INPUT:
      return {
        ...state,
        input: {
          ...state.input,
          value: action.payload,
          isEmpty: !action.payload.length,
        },
      };

    /* 
    CARS 
    */
    case constants.search.SET_CARS:
      return {
        ...state,
        cars: action.payload,
      };

    /* 
    GARAGES 
    */
    case constants.search.SET_GARAGES:
      return {
        ...state,
        garages: action.payload,
      };

    /*
    API
    */
    case constants.search.api.SET_LOADING:
      return {
        ...state,
        api: {
          ...state.api,
          loading: action.payload,
        },
      };

    case constants.search.api.SET_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          error: action.payload,
        },
      };

    case constants.search.api.SET_SUCCESS:
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
