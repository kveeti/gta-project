import { combineReducers } from "redux";

import matchingPossibleCars from "./matchingPossibleCars.js";
import matchingGarages from "./matchingGarages.js";
import matchingCars from "./matchingCars.js";

import searchInput from "./searchInput.js";
import newCarInput from "./newCarInput.js";
import garageInput from "./garageInput.js";

import isMoving from "./isMoving.js";
import newGarageId from "./newGarageId.js";
import carsToMove from "./carsToMove.js";

import newGarageName from "./newGarageName.js";
import newGarageDesc from "./newGarageDesc.js";

import user from "./user.js";

import badSearch from "./badSearch.js";

import garagePage from "./garagePage.js";

export const reducers = combineReducers({
  matchingPossibleCars,
  matchingGarages,
  matchingCars,

  searchInput,
  newCarInput,
  garageInput,

  isMoving,
  newGarageId,
  carsToMove,

  newGarageName,
  newGarageDesc,

  user,
  badSearch,

  garagePage,
});
