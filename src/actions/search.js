import axios from "axios";

import { apiUrl } from "../config.js";

import {
  SEARCH_SET_INPUT,
  SEARCH_SET_CARS,
  SEARCH_SET_GARAGES,
} from "../constants/actionTypes";

export const search = (query) => async (dispatch) => {
  if (!query) return;

  await axios
    .get(
      `${apiUrl}/gta-api/search`,
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
      dispatch(search_setCars(res.data.cars));
      dispatch(search_setGarages(res.data.garages));
    })
    .catch((error) => {
      console.log("search error");
    });
};

export const search_setInput = (searchInput) => {
  return {
    type: SEARCH_SET_INPUT,
    payload: searchInput,
  };
};

export const search_setGarages = (garages) => {
  return { type: SEARCH_SET_GARAGES, payload: garages };
};

export const search_setCars = (cars) => {
  return { type: SEARCH_SET_CARS, payload: cars };
};
