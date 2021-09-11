import { combineReducers } from "redux";

import user from "./user.js";

import search from "./search.js";

import newCar from "./newCar.js";
import newGarage from "./newGarage.js";

import moveCar from "./moveCar";
import garageRename from "./garageRename.js";

export const reducers = combineReducers({
  user,

  search,

  newCar,
  newGarage,

  moveCar,
  garageRename,
});

export default function createReducer(initialState, handlers) {
  const reducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };

  return reducer;
}
