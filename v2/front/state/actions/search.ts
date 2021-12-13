import axios from "axios";
import { signIn } from "next-auth/react";
import { Car } from "../../interfaces/Car";
import { Garage } from "../../interfaces/Garage";
import { constants } from "../actionTypes";
import { getNextAxiosConfig } from "./axiosConfig";

export const search = {
  set: {
    input: (query: string) => {
      return {
        type: constants.search.SET_INPUT,
        payload: query,
      };
    },

    cars: (cars: Car[]) => {
      return {
        type: constants.search.SET_CARS,
        payload: cars,
      };
    },

    garages: (garages: Garage[]) => {
      return {
        type: constants.search.SET_GARAGES,
        payload: garages,
      };
    },
  },

  api: {
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
  },

  search: (query: string) => async (dispatch: any) => {
    try {
      if (!query.length) return;
      if (!query) return;

      dispatch(search.api.setLoading(true));

      const res = await axios(getNextAxiosConfig("/search", "GET", query));

      dispatch(search.set.cars(res.data.cars));
      dispatch(search.set.garages(res.data.garages));
      dispatch(search.api.setLoading(false));

      if (!res.data.cars.length && !res.data.garages.length) dispatch(search.api.setNotFound(true));
    } catch (err: any) {
      dispatch(search.api.setError(true));
      if (!err.response) return;
      if (err.response.status === 401) return signIn();
    }
  },
};
