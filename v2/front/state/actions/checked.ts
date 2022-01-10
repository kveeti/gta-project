import axios from "axios";
import { actions } from ".";
import { ICar } from "../../interfaces/Car";
import { config } from "../../util/axios";
import { constants } from "../actionTypes";

export const checkCar = (car: ICar) => {
  return {
    type: constants.checked.CHECK_CAR,
    payload: car,
  };
};

export const reset = () => {
  return {
    type: constants.checked.RESET,
  };
};

export const removeApi = {
  setLoading: (loading: boolean) => {
    return {
      type: constants.checked.removeApi.REMOVING,
      payload: loading,
    };
  },

  setError: (error: boolean) => {
    return {
      type: constants.checked.removeApi.ERROR,
      payload: error,
    };
  },
};

export const setShow = (show: boolean) => {
  return {
    type: constants.checked.SET_SHOW,
    payload: show,
  };
};

export const setCheckedCars = (checkedCars: ICar[]) => {
  return {
    type: constants.checked.SET_CHECKED_CARS,
    payload: checkedCars,
  };
};

export const remove = (cars: ICar[], searchInput: string) => async (dispatch) => {
  try {
    if (!cars.length) return;

    dispatch(removeApi.setLoading(true));
    await axios(config(`/cars`, "DELETE", cars));
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
