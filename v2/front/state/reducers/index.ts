import { combineReducers } from "redux";

import search from "./search";
import users from "./users";
import checked from "./check";
import newCar from "./newCar";

export const reducers = combineReducers({
  search,
  users,
  checked,
  newCar,
});