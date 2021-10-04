import axios from "axios";

import { apiUrl } from "../config.js";
import { SET_CAR_BEING_DELETED } from "../constants/actionTypes.js";
import { search } from "./search";

export const deleteCar = (car_id, query) => async (dispatch) => {
  try {
    const res = await axios.delete(`${apiUrl}/gta-api/cars/${car_id}`);

    if (res.status === 200) {
      search(query);
    }
  } catch {
    console.log("car delete error");
  }
};

export const setCarDeleting = (car_id) => {
  return { type: SET_CAR_BEING_DELETED, payload: car_id };
};
