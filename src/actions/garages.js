import {
  CLEAR_GARAGES,
  SEARCH_GARAGES,
  SET_GARAGE_INPUT,
  NEW_GARAGE_ID,
  SET_NEW_GARAGE_NAME,
  SET_NEW_GARAGE_DESC,
  GARAGE_PAGE,
  GARAGE_PAGE_CLEAR,
  GARAGE_PAGE_SET_NAME,
  GARAGE_PAGE_SET_DESC,
} from "../constants/actionTypes";

import axios from "axios";

import { search } from "./search.js";

const config = require(".././config.json");

export const searchGarages = (query) => async (dispatch) => {
  try {
    // if (!query) return;
    await axios
      .get(`${config.API_URL}/gta-api/garages`, {
        params: { q: query },
      })
      .then((res) => {
        if (res.status === 204) {
          return dispatch({ type: SEARCH_GARAGES, payload: 204 });
        }

        dispatch({ type: SEARCH_GARAGES, payload: res.data });
      });
  } catch (err) {
    console.log("failed to search garages");
  }
};

export const getCarsForGarage = (garage_id) => async (dispatch) => {
  try {
    if (!garage_id) return;

    await axios
      .get(`${config.API_URL}/gta-api/garages/${garage_id}`)
      .then((res) => {
        dispatch({
          type: GARAGE_PAGE,
          payload: {
            garageName: res.data.garage.name,
            garageNameInput: res.data.garage.name,
            garage_id: res.data.garage._id,
            garageDesc: res.data.garage.desc,
            garageDescInput: res.data.garage.desc,
            cars: res.data.garage.cars,
          },
        });
      })
      .catch((err) => {
        console.log("failed to get cars for garage");
      });
  } catch (err) {
    console.log(err);
  }
};

export const renameGarage =
  (newName, newDesc = "", garage_id, searchInput) =>
  async (dispatch) => {
    axios
      .patch(`${config.API_URL}/gta-api/garages/${garage_id}`, {
        newName,
        newDesc,
      })
      .then((res) => {
        dispatch(getCarsForGarage(garage_id));
        dispatch(search(searchInput));
      })
      .catch((err) => {
        console.log("failed to rename the garage");
      });
  };

export const garagePageSetName = (newName) => {
  return { type: GARAGE_PAGE_SET_NAME, payload: newName };
};

export const garagePageSetDesc = (newDesc) => {
  return { type: GARAGE_PAGE_SET_DESC, payload: newDesc };
};

export const clearGarage = () => {
  return { type: GARAGE_PAGE_CLEAR };
};

export const clearGarages = () => {
  return { type: CLEAR_GARAGES };
};

export const setGarageInput = (value) => {
  return { type: SET_GARAGE_INPUT, payload: value };
};

export const setNewGarageId = (id) => {
  return { type: NEW_GARAGE_ID, payload: id };
};

export const setNewGarageName = (value) => {
  return { type: SET_NEW_GARAGE_NAME, payload: value };
};

export const setNewGarageDesc = (value) => {
  return { type: SET_NEW_GARAGE_DESC, payload: value };
};

export const createNewGarage =
  (name, desc = "") =>
  async (dispatch) => {
    try {
      axios.post(`${config.API_URL}/gta-api/garages`, {
        name: name,
        desc: desc,
      });
    } catch (err) {
      console.log(err);
    }
  };
