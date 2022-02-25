import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.users, action: any) => {
  switch (action.type) {
    case constants.users.SET_ME:
      return {
        ...state,
        me: action.payload,
      };

    case constants.users.api.SET_LOADING:
      return {
        ...state,
        api: {
          ...state.api,
          loading: action.payload,
        },
      };

    case constants.users.api.SET_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
