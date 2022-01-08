import { combineReducers } from "redux";

import search from "./search";
import users from "./users";
import checked from "./checked";
import newCar from "./newCar";
import newGarage from "./newGarage";
import breakpoint from "./breakpoint";
import move from "./move";

export const reducers = combineReducers({
  search,
  users,
  checked,
  newCar,
  newGarage,
  bp: breakpoint,
  move,
});
