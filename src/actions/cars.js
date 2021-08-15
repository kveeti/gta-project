import axios from "axios";
import { search } from "./search";

const config = require(".././config.json");

export const deleteCar = (car_id, query) => async (dispatch) => {
  const res = await axios.delete(`${config.API_URL}/gta-api/cars/${car_id}`);

  if (res.status === 200) {
    search(query);
  }

  //dispatch({ type: DELETED_CAR, payload: car_id });
};
