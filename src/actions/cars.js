import { DELETED_CAR } from "../constants/actionTypes";

import axios from "axios";

const config = require(".././config.json");

export const deleteCar = (id) => async (dispatch) => {
  await axios.delete(`${config.API_URL}/gta-api/cars/${id}`);

  dispatch({ type: DELETED_CAR, payload: id });
};
