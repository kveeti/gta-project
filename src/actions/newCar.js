import {
  NEWCAR_SET_CAR_NAME,
  NEWCAR_SET_GARAGE_NAME,
  NEWCAR_SET_POSSIBLE_CARS,
  NEWCAR_SET_GARAGES,
  NEWCAR_CHECK_CHOSEN_GARAGE,
  NEWCAR_CHECK_CHOSEN_POSSIBLE_CAR,
  NEWCAR_CLEAR_ALL,
} from "../constants/actionTypes";

import axios from "axios";

const config = require(".././config.json");

// CAR STUFF

export const newCar_searchPossibleCars = (query) => async (dispatch) => {
  if (!query) return;

  await axios
    .get(`${config.API_URL}/gta-api/cars/possible`, {
      params: { q: query },
    })
    .then((res) => {
      dispatch(newCar_setPossibleCars(res.data.possibleCars));
    })
    .catch((err) => {
      console.log("failed to search possible cars");
    });
};

export const newCar_searchGarages = (query) => async (dispatch) => {
  if (!query) return;

  await axios
    .get(`${config.API_URL}/gta-api/garages`, {
      params: { q: query },
    })
    .then((res) => {
      dispatch(newCar_setGarages(res.data.garages));
    })
    .catch((err) => {
      console.log("failed to search possible cars");
    });
};

export const newCar_setGarages = (garages) => {
  return { type: NEWCAR_SET_GARAGES, payload: garages };
};

export const newCar_setPossibleCars = (possibleCars) => {
  return {
    type: NEWCAR_SET_POSSIBLE_CARS,
    payload: possibleCars,
  };
};

export const newCar_setCarName = (newCarName) => {
  return {
    type: NEWCAR_SET_CAR_NAME,
    payload: newCarName,
  };
};

export const newCar_setGarageName = (newCarGarageName) => {
  return {
    type: NEWCAR_SET_GARAGE_NAME,
    payload: newCarGarageName,
  };
};

export const newCar_checkChosenGarage = (garage) => {
  return { type: NEWCAR_CHECK_CHOSEN_GARAGE, payload: garage };
};

export const newCar_checkChosenPossibleCar = (possibleCar) => {
  return { type: NEWCAR_CHECK_CHOSEN_POSSIBLE_CAR, payload: possibleCar };
};

export const newCar_clearAll = () => {
  return { type: NEWCAR_CLEAR_ALL };
};

export const newCar_addCar = (name, garageId) => async (dispatch) => {
  await axios.post(`${config.API_URL}/gta-api/cars`, {
    name,
    garageId,
  });
};
