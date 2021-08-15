import {
  NEWCAR_SET_CAR_NAME,
  NEWCAR_SET_GARAGE_NAME,
  NEWCAR_SET_GARAGE_ID,
  NEWCAR_SET_POSSIBLE_CARS,
  NEWCAR_SET_GARAGES,
  // NEWCAR_BAD_CAR,
  // NEWCAR_BAD_GARAGE,
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
      if (res.status === 204) {
        return dispatch({ type: NEWCAR_SET_POSSIBLE_CARS, payload: 204 });
      }
      dispatch({ type: NEWCAR_SET_POSSIBLE_CARS, payload: res.data });
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
      dispatch({ type: NEWCAR_SET_GARAGES, payload: res.data.garages });

      /* if (!res.data.garages.length) {
        dispatch(newCar_setBadGarage(true));
      } */
    })
    .catch((err) => {
      console.log("failed to search possible cars");
    });
};

export const newCar_setGarages = (garages) => {
  return { type: NEWCAR_SET_GARAGES, payload: garages };
};

/* export const newCar_setBadCar = (value) => {
  return {
    type: NEWCAR_BAD_CAR,
    payload: value,
  };
};

export const newCar_setBadGarage = (value) => {
  return {
    type: NEWCAR_BAD_GARAGE,
    payload: value,
  };
}; */

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

export const newCar_setGarageId = (newCarGarageId) => {
  return {
    type: NEWCAR_SET_GARAGE_ID,
    payload: newCarGarageId,
  };
};

export const addCar = (name, ID) => async (dispatch) => {
  await axios.post(`${config.API_URL}/gta-api/cars`, {
    name: name,
    garageID: ID,
  });
};
