import { actions } from ".";
import { initState } from "../InitState";

export const resetState = () => async (dispatch) => {
  dispatch(actions.checked.reset());
  dispatch(actions.move.reset());
  dispatch(actions.newCar.reset());
  dispatch(actions.newGarage.reset());
  dispatch(actions.search.set.input(""));
  dispatch(actions.users.set.me(initState.users.me));
};
