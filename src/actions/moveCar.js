import axios from "axios";

import {
  MOVE_CAR_IS_MOVING,
  MOVE_CAR_FORCE_IS_MOVING,
  MOVE_CAR_CHECK_MOVE_LIST,
  MOVE_CAR_SET_GARAGES,
  MOVE_CAR_SET_GARAGE_INPUT,
  MOVE_CAR_CHECK_CHOSEN_GARAGE,
  MOVE_CAR_CLEAR,
  MOVE_CAR_CHECK_ERROR_CAR,
} from "../constants/actionTypes";

import config from ".././config.json";

export const isMoving = () => {
  return {
    type: MOVE_CAR_IS_MOVING,
  };
};

export const forceIsMoving = (forcedState) => {
  return {
    type: MOVE_CAR_FORCE_IS_MOVING,
    payload: forcedState,
  };
};

export const moveCar_checkCar = (car) => {
  return { type: MOVE_CAR_CHECK_MOVE_LIST, payload: car };
};

export const moveCar_setGarages = (garages) => {
  return { type: MOVE_CAR_SET_GARAGES, payload: garages };
};

export const moveCar_setGarageInput = (input) => {
  return { type: MOVE_CAR_SET_GARAGE_INPUT, payload: input };
};

export const moveCar_checkChosenGarage = (garage) => {
  return { type: MOVE_CAR_CHECK_CHOSEN_GARAGE, payload: garage };
};

export const moveCar_clear = () => {
  return { type: MOVE_CAR_CLEAR };
};

export const moveCar_checkErrorCar = (errorCar) => {
  return { type: MOVE_CAR_CHECK_ERROR_CAR, payload: errorCar };
};

export const moveCar_searchGarages = (query) => async (dispatch) => {
  if (!query) return;

  await axios
    .get(`${config.API_URL}/gta-api/garages`, {
      params: { q: query },
    })
    .then((res) => {
      dispatch(moveCar_setGarages(res.data.garages));
    })
    .catch((err) => {
      console.log("failed to search possible cars");
    });
};
