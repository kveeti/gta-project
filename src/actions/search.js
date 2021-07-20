import {
  SEARCH_CARS,
  CLEAR_CARS,
  SET_SEARCH_INPUT,
  BAD_SEARCH,
} from "../constants/actionTypes";

import axios from "axios";

const config = require("../config.json");

export const search = (query) => async (dispatch) => {
  if (!query) return;

  await axios
    .get(
      `${config.API_URL}/gta-api/cars`,
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

      if (res.data[0]) {
        dispatch({ type: SEARCH_CARS, payload: res.data });
        dispatch({ type: BAD_SEARCH, payload: false });
      }

      if (res.status === 304 || res.status === 200) {
        dispatch({ type: BAD_SEARCH, payload: false });
      }
    })
    .catch((error) => {
      console.log("search failed");
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
