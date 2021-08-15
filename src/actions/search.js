import {
  SEARCH_CARS,
  CLEAR_CARS,
  SET_SEARCH_INPUT,
  BAD_SEARCH,
  SEARCH_GARAGES,
} from "../constants/actionTypes";

import axios from "axios";

const config = require("../config.json");

export const search = (query) => async (dispatch) => {
  if (!query) return;

  await axios
    .get(
      `${config.API_URL}/gta-api/search`,
      {
        params: { q: query },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.status === 204) {
        dispatch({ type: SEARCH_CARS, payload: 204 });
        return dispatch({ type: BAD_SEARCH, payload: true });
      }

      if (res.status === 304 || res.status === 200) {
        dispatch({ type: BAD_SEARCH, payload: false });
      }

      if (!res.data.cars) {
        dispatch({ type: SEARCH_CARS, payload: 204 });
        dispatch({ type: SEARCH_GARAGES, payload: res.data.garages });
        return dispatch({ type: BAD_SEARCH, payload: true });
      }
      dispatch({ type: SEARCH_CARS, payload: res.data.cars });
      dispatch({ type: SEARCH_GARAGES, payload: res.data.garages });
      dispatch({ type: BAD_SEARCH, payload: false });
    })
    .catch((error) => {
      console.log("search failed", error);
    });
};

export const setSearchInput = (value) => {
  return {
    type: SET_SEARCH_INPUT,
    payload: value,
  };
};

export const clearCars = () => {
  return { type: CLEAR_CARS, action: "clear" };
};
