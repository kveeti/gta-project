import { constants } from "../actionTypes";

export const set = (bp: number) => ({
  type: constants.SET_BREAKPOINT,
  payload: bp,
});
