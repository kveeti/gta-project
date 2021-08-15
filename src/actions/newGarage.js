import {
  NEW_GARAGE_SET_NAME,
  NEW_GARAGE_SET_DESC,
} from "../constants/actionTypes";

import axios from "axios";

const config = require("../config.json");

export const newGarage_setName = (garageName) => {
  return { type: NEW_GARAGE_SET_NAME, payload: garageName };
};

export const newGarage_setDesc = (garageDesc) => {
  return { type: NEW_GARAGE_SET_DESC, payload: garageDesc };
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
      console.log("garage creating failed");
    }
  };
