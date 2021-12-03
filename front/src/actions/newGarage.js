import axios from "axios";

import { apiUrl } from "../config.js";

import {
  NEW_GARAGE_SET_NAME,
  NEW_GARAGE_SET_DESC,
  NEW_GARAGE_API_LOADING,
  NEW_GARAGE_API_FAILURE,
  NEW_GARAGE_API_SUCCESS,
} from "../constants/actionTypes";

export const newGarage_setName = (garageName) => {
  return { type: NEW_GARAGE_SET_NAME, payload: garageName };
};

export const newGarage_setDesc = (garageDesc) => {
  return { type: NEW_GARAGE_SET_DESC, payload: garageDesc };
};

export const newGarage_api_setLoading = (value) => {
  return { type: NEW_GARAGE_API_LOADING, payload: value };
};

export const newGarage_api_setSuccess = (value) => {
  return { type: NEW_GARAGE_API_SUCCESS, payload: value };
};

export const newGarage_api_setFailure = (value) => {
  return { type: NEW_GARAGE_API_FAILURE, payload: value };
};

export const newGarage_addGarage = (name, desc) => async (dispatch) => {
  dispatch(newGarage_api_setLoading(true));

  try {
    const res = await axios.post(`${apiUrl}/gta-api/garages`, {
      name,
      desc,
    });

    if (res.data.newGarage.name === name && res.data.newGarage.desc === desc) {
      creationSuccess(dispatch);
    }
  } catch {
    creationFailure(dispatch);
  }
};

const creationSuccess = (dispatch) => {
  setTimeout(() => {
    dispatch(newGarage_api_setLoading(false));
    dispatch(newGarage_api_setSuccess(true));

    setTimeout(() => {
      dispatch(newGarage_setName(""));
      dispatch(newGarage_setDesc(""));
    }, 800);

    setTimeout(() => {
      dispatch(newGarage_api_setSuccess(false));
    }, 2000);
  }, 600);
};

const creationFailure = (dispatch) => {
  dispatch(newGarage_api_setFailure(true));

  setTimeout(() => {
    dispatch(newGarage_api_setFailure(false));
  }, 3000);
};
