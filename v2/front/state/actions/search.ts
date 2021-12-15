import axios from "axios";
import { signIn } from "next-auth/react";
import { ICar } from "../../interfaces/Car";
import { IGarage } from "../../interfaces/Garage";
import { constants } from "../actionTypes";
import { getNextAxiosConfig } from "./axiosConfig";

export const set = {
  input: (query: string) => {
    return {
      type: constants.search.SET_INPUT,
      payload: query,
    };
  },

  cars: (cars: ICar[]) => {
    return {
      type: constants.search.SET_CARS,
      payload: cars,
    };
  },

  garages: (garages: IGarage[]) => {
    return {
      type: constants.search.SET_GARAGES,
      payload: garages,
    };
  },
};

export const api = {
  setLoading: (loading: boolean) => {
    return {
      type: constants.search.api.SET_LOADING,
      payload: loading,
    };
  },

  setError: (error: boolean) => {
    return {
      type: constants.search.api.SET_ERROR,
      payload: error,
    };
  },

  setNotFound: (notFound: boolean) => {
    return {
      type: constants.search.api.SET_NOT_FOUND,
      payload: notFound,
    };
  },

  reset: () => {
    return {
      type: constants.search.api.RESET,
    };
  },
};

export const search = (query: string) => async (dispatch: any) => {
  try {
    if (!query.length) return;
    if (!query) return;

    dispatch(api.setLoading(true));

    const res = await axios(getNextAxiosConfig("/search", "GET", query));

    dispatch(set.cars(res.data.cars));
    dispatch(set.garages(res.data.garages));
    dispatch(api.setLoading(false));

    if (!res.data.cars.length && !res.data.garages.length) dispatch(api.setNotFound(true));
  } catch (err: any) {
    dispatch(api.setLoading(false));
    dispatch(api.setError(true));
    if (!err.response) return;
    if (err.response.status === 401) return signIn();
  }
};
