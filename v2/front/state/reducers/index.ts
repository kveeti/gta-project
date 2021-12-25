import { combineReducers } from "redux";

import search from "./search";
import users from "./users";
import checkedCars from "./checkedCars";
import newCar from "./newCar";
import newGarage from "./newGarage";
import breakpoint from "./breakpoint";

export const reducers = combineReducers({
  search,
  users,
  checkedCars,
  newCar,
  newGarage,
  bp: breakpoint,
});
