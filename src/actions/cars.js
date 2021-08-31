import axios from "axios";
import { search } from "./search";

const config = require(".././config.json");

export const deleteCar = (car_id, query) => async (dispatch) => {
  try {
    const res = await axios.delete(`${config.API_URL}/gta-api/cars/${car_id}`);

    if (res.status === 200) {
      search(query);
    }
  } catch (_) {
    console.log("car delete error");
  }
};
