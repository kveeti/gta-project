import { ICar } from "../../interfaces/Car";
import { IGarage } from "../../interfaces/Garage";
import { request } from "../../util/axios";
import { constants } from "../actionTypes";

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
  if (!query.length) return;
  if (!query) return;

  dispatch(api.setLoading(true));
  const res = await request(`/search?query=${query}`, "GET");
  dispatch(api.setLoading(false));

  if (res) {
    dispatch(set.cars(res.data.cars));
    dispatch(set.garages(res.data.garages));
    if (!res.data.cars.length && !res.data.garages.length) dispatch(api.setNotFound(true));
  } else {
    dispatch(api.setError(true));
  }
};
