import {
  NEWCAR_SET_CAR_NAME,
  NEWCAR_SET_GARAGE_NAME,
  NEWCAR_SET_POSSIBLE_CARS,
  NEWCAR_SET_GARAGES,
  NEWCAR_CHECK_CHOSEN_GARAGE,
  NEWCAR_CHECK_CHOSEN_POSSIBLE_CAR,
  NEWCAR_CLEAR_ALL,
  NEWCAR_API_FAILURE,
  NEWCAR_API_LOADING,
  NEWCAR_API_SUCCESS,
} from "../constants/actionTypes";

import axios from "axios";

const config = require(".././config.json");

let possibleCarCancelToken;
let garageCancelToken;

export const newCar_searchPossibleCars = (query) => async (dispatch) => {
  if (!query) return;

  if (typeof possibleCarCancelToken != typeof undefined) {
    possibleCarCancelToken.cancel();
  }

  possibleCarCancelToken = axios.CancelToken.source();

  try {
    const res = await axios.get(`${config.API_URL}/gta-api/cars/possible`, {
      params: { q: query },
      cancelToken: possibleCarCancelToken.token,
    });

    dispatch(newCar_setPossibleCars(res.data.possibleCars));
  } catch {}
};

export const newCar_searchGarages = (query) => async (dispatch) => {
  if (!query) return;

  if (typeof newCarCancelToken != typeof undefined) {
    garageCancelToken.cancel();
  }

  garageCancelToken = axios.CancelToken.source();

  try {
    const res = await axios.get(`${config.API_URL}/gta-api/garages`, {
      params: { q: query },
      cancelToken: garageCancelToken.token,
    });

    dispatch(newCar_setGarages(res.data.garages));
  } catch {}
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

export const newCar_addCar = (carId, garageId) => async (dispatch) => {
  try {
    dispatch(newCar_api_setLoading(true));

    await axios.post(`${config.API_URL}/gta-api/cars`, {
      carId,
      garageId,
    });

    creationSuccess(dispatch);
  } catch {
    creationFailure();
  }
};

export const newCar_api_setLoading = (value) => {
  return { type: NEWCAR_API_LOADING, payload: value };
};

export const newCar_api_setSuccess = (value) => {
  return { type: NEWCAR_API_SUCCESS, payload: value };
};

export const newCar_api_setFailure = (value) => {
  return { type: NEWCAR_API_FAILURE, payload: value };
};

const creationSuccess = (dispatch) => {
  setTimeout(() => {
    dispatch(newCar_api_setSuccess(true));
    dispatch(newCar_api_setLoading(false));

    setTimeout(() => {
      dispatch(newCar_clearAll());
    }, 800);

    setTimeout(() => {
      dispatch(newCar_api_setSuccess(false));
    }, 2000);
  }, 600);
};

const creationFailure = (dispatch) => {
  setTimeout(() => {
    dispatch(newCar_api_setFailure(true));

    setTimeout(() => {
      dispatch(newCar_api_setLoading(false));
    }, 1500);

    setTimeout(() => {
      dispatch(newCar_api_setFailure(false));
    }, 5000);
  }, 1000);
};
