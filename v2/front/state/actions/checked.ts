import { actions } from ".";
import { ICar } from "../../interfaces/Car";
import { request } from "../../util/axios";
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

export const remove = (carIds: string[], searchInput: string) => async (dispatch) => {
  if (!carIds.length) return;

  dispatch(removeApi.setLoading(true));
  const res = await request(`/cars`, "DELETE", { carIds });
  dispatch(removeApi.setLoading(false));

  if (res) {
    dispatch(reset());
    dispatch(actions.users.get.me());
    if (searchInput) dispatch(actions.search.search(searchInput));
  } else {
    dispatch(removeApi.setError(true));
  }
};
