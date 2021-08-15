import axios from "axios";
import {
  GARAGE_PAGE,
  GARAGE_PAGE_CLEAR,
  GARAGE_PAGE_SET_DESC,
  GARAGE_PAGE_SET_NAME,
} from "../constants/actionTypes.js";

import { search } from "./search.js";

const config = require(".././config.json");

export const garagePage_rename =
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

export const clearGaragePage = () => {
  return { type: GARAGE_PAGE_CLEAR };
};

export const garagePage_setName = (newName) => {
  return { type: GARAGE_PAGE_SET_NAME, payload: newName };
};

export const garagePage_setDesc = (newDesc) => {
  return { type: GARAGE_PAGE_SET_DESC, payload: newDesc };
};
