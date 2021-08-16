import { combineReducers } from "redux";

import moveCar from "./moveCar";

import user from "./user.js";

import garagePage from "./garagePage.js";

import search from "./search.js";
import newCar from "./newCar.js";
import newGarage from "./newGarage.js";

export const reducers = combineReducers({
  user,

  garagePage,

  search,
  newCar,
  moveCar,
  newGarage,
});
