import { toast } from "react-toastify";
import { actions } from ".";
import { ICar } from "../../interfaces/Car";
import { IGarage } from "../../interfaces/Garage";
import { request } from "../../util/axios";
import { constants } from "../actionTypes";

export const reset = () => {
  return {
    type: constants.move.RESET,
  };
};

export const show = (value: boolean) => {
  return {
    type: constants.move.SHOW,
    payload: value,
  };
};

export const matchingGarages = {
  search: (query: string) => async (dispatch) => {
    if (!query) return;

    dispatch(matchingGarages.api.setLoading(true));
    const res = await request(`/garages?query=${query}`, "GET");
    dispatch(matchingGarages.api.setLoading(false));

    if (res) {
      dispatch(matchingGarages.api.setSuccess(true));
      dispatch(matchingGarages.set(res.data));
    } else {
      dispatch(matchingGarages.api.setError(true));
    }
  },

  set: (matchingGarages: IGarage[]) => {
    return {
      type: constants.move.matchingGarages.SET,
      payload: matchingGarages,
    };
  },

  api: {
    setLoading: (loading: boolean) => {
      return {
        type: constants.move.matchingGarages.api.SET_LOADING,
        payload: loading,
      };
    },

    setError: (error: boolean) => {
      return {
        type: constants.move.matchingGarages.api.SET_ERROR,
        payload: error,
      };
    },

    setSuccess: (error: boolean) => {
      return {
        type: constants.move.matchingGarages.api.SET_SUCCESS,
        payload: error,
      };
    },
  },
};

export const set = {
  chosenGarage: (garage: IGarage) => {
    return {
      type: constants.move.set.CHOSEN_GARAGE,
      payload: garage,
    };
  },

  garageInput: (value: string) => {
    return {
      type: constants.move.set.GARAGE_INPUT,
      payload: value,
    };
  },
};

export const api = {
  setLoading: (loading: boolean) => {
    return {
      type: constants.move.api.SET_SAVING,
      payload: loading,
    };
  },

  setError: (error: boolean) => {
    return {
      type: constants.move.api.SET_ERROR,
      payload: error,
    };
  },

  setSuccess: (error: boolean) => {
    return {
      type: constants.move.api.SET_SUCCESS,
      payload: error,
    };
  },
};

export const move = (cars: ICar[], garage: IGarage, searchInput: string) => async (dispatch) => {
  if (!cars.length) return;
  if (!garage) return;

  const carIds = cars.map((car) => car.id);

  dispatch(api.setLoading(true));
  const res = await request(`/cars/move`, "POST", {
    newGarageId: garage.id,
    carIds,
  });
  dispatch(api.setLoading(false));

  if (res) {
    dispatch(actions.checked.setCheckedCars(res.data));
    dispatch(actions.users.get.me());
    toast.success("Cars moved successfully!");
    dispatch(reset());
    if (searchInput) dispatch(actions.search.search(searchInput));
  } else {
    dispatch(api.setError(true));
  }
};
