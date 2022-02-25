import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.bp, action: any) => {
  switch (action.type) {
    case constants.SET_BREAKPOINT:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
