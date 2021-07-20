import {
  SEARCH_POSSIBLE_CARS,
  SET_NEWCAR_INPUT,
  CLEAR_POSSIBLE_CARS,
} from "../constants/actionTypes";

import axios from "axios";

const config = require(".././config.json");

// CAR STUFF

export const searchPossibleCars = (query) => async (dispatch) => {
  if (!query) return;

  await axios
    .get(`${config.API_URL}/gta-api/cars/possible`, {
      params: { q: query },
    })
    .then((res) => {
      if (res.status === 204) {
        return dispatch({ type: SEARCH_POSSIBLE_CARS, payload: 204 });
      }
      dispatch({ type: SEARCH_POSSIBLE_CARS, payload: res.data });
    })
    .catch((err) => {
      console.log("failed to search possible cars");
    });
};

export const setNewCarInput = (value) => {
  return {
    type: SET_NEWCAR_INPUT,
    payload: value,
  };
};

export const clearPossibleCars = () => {
  return { type: CLEAR_POSSIBLE_CARS, payload: "clear possible cars" };
};

export const addCar = (name, ID) => async (dispatch) => {
  await axios.post(`${config.API_URL}/gta-api/cars`, {
    name: name,
    garageID: ID,
  });
};
