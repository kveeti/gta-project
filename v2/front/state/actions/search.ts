import axios from "axios";
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

    setSuccess: (success: boolean) => {
      return {
        type: constants.search.api.SET_SUCCESS,
        payload: success,
      };
    },
  },

  search: (query: string) => async (dispatch: any) => {
    try {
      if (!query.length) return;
      if (!query) return;

      const res = await axios(getNextAxiosConfig("/search", "GET", query));

      dispatch(search.set.cars(res.data.cars));
      dispatch(search.set.garages(res.data.garages));
    } catch (err: any) {
      console.log(err);

      console.log("Error in searchCars");
    }
  },
};
