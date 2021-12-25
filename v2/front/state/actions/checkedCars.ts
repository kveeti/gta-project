import axios from "axios";
import { actions } from ".";
import { ICar } from "../../interfaces/Car";
import { constants } from "../actionTypes";
import { getNextAxiosConfig } from "./axiosConfig";

export const check = (car: ICar) => {
  return {
    type: constants.checkedCars.CHECK,
    payload: car,
  };
};

export const reset = () => {
  return {
    type: constants.checkedCars.RESET,
  };
};

export const removeApi = {
  setLoading: (loading: boolean) => {
    return {
      type: constants.checkedCars.removeApi.REMOVING,
      payload: loading,
    };
  },

  setError: (error: boolean) => {
    return {
      type: constants.checkedCars.removeApi.ERROR,
      payload: error,
    };
  },
};

export const remove = (cars: ICar[], searchInput: string) => async (dispatch) => {
  try {
    if (!cars.length) return;

    dispatch(removeApi.setLoading(true));
    await axios(getNextAxiosConfig(`/cars`, "DELETE", cars));
    dispatch(removeApi.setLoading(false));
    dispatch(reset());

    if (searchInput) {
      dispatch(actions.search.search(searchInput));
    }
  } catch (error) {
    dispatch(removeApi.setLoading(false));
    dispatch(removeApi.setError(true));
  }
};
