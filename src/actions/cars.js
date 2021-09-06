import axios from "axios";

import { apiUrl } from "../config.js";
import { search } from "./search";

export const deleteCar = (car_id, query) => async (dispatch) => {
  try {
    const res = await axios.delete(`${apiUrl}/gta-api/cars/${car_id}`);

    if (res.status === 200) {
      search(query);
    }
  } catch (_) {
    console.log("car delete error");
  }
};
