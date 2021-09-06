import axios from "axios";

import { apiUrl } from "../config.js";

import {
  AUTH_API_STATUS,
  LOGIN,
  LOGOUT,
  SET_LOGGED_IN,
} from "../constants/actionTypes";

export const login = (token) => async (dispatch) => {
  await axios
    .post(`${apiUrl}/gta-api/auth/login`, {
      token,
    })
    .then((response) => {
      dispatch({
        type: LOGIN,
      });
    })
    .catch((error) => {
      if (error.response.status === 401) {
        console.log("invalid token");
      }
      if (error.response.status === 500) {
        console.log("server error");
      }
    });
};

export const checkLogin = () => async (dispatch) => {
  axios
    .get(`${apiUrl}/gta-api/check/login`)
    .then((res) => {
      dispatch(setLoggedIn(true));
    })
    .catch((err) => {
      if (!err.response) {
        return dispatch({
          type: AUTH_API_STATUS,
          payload: { message: "site down", success: false, loading: false },
        });
      }

      dispatch({
        type: AUTH_API_STATUS,
        payload: { message: null, success: true, loading: false },
      });
    });
};

export const logout = () => async (dispatch) => {
  await axios.delete(`${apiUrl}/gta-api/auth/logout`).then((res) => {
    dispatch({ type: LOGOUT });
  });
};

export const setLoggedIn = (value) => {
  return { type: SET_LOGGED_IN, payload: value };
};
