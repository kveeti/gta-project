import axios from "axios";
import { toast } from "react-toastify";
import { actions } from ".";
import { ICar } from "../../interfaces/Car";
import { IGarage } from "../../interfaces/Garage";
import { constants } from "../actionTypes";
import { getNextAxiosConfig } from "./axiosConfig";

export const reset = () => {
  return {
    type: constants.move.RESET,
  };
};

export const matchingGarages = {
  search: (query: string) => async (dispatch) => {
    try {
      if (!query) return;

      dispatch(matchingGarages.api.setLoading(true));
      const response = await axios(getNextAxiosConfig(`/search/garages?q=${query}`, "GET"));
      dispatch(matchingGarages.api.setLoading(false));
      dispatch(matchingGarages.api.setSuccess(false));

      dispatch(matchingGarages.set(response.data.garages));
    } catch (error) {
      dispatch(matchingGarages.api.setLoading(false));
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
  try {
    if (!cars.length) return;

    const carIds = cars.map((car) => car.id);

    dispatch(api.setLoading(true));
    const { data } = await axios(getNextAxiosConfig(`/garages/${garage.id}`, "PATCH", { carIds }));
    dispatch(api.setLoading(false));
    dispatch(api.setError(false));
    dispatch(reset());

    if (data) {
      // if some cars were moved, but errors occured
      if (data.errorCars?.length) {
        const plural = data.errorCars?.length === 1 ? "" : "s";
        if (data.errorCars.length !== cars.length) {
          toast.error(
            `${data.errorCars?.length} car${plural} could not be moved, check selected cars for errors.`
          );

          toast.success(
            `Successfully moved ${cars.length - data.errorCars?.length} cars to ${garage.name}`
          );
        } else {
          // no cars got moved
          toast.error(`No cars were moved, check selected cars for errors.`);
        }
      } else {
        // no errors occured
        toast.success(`Successfully moved cars to ${garage.name}`);
      }

      dispatch(actions.checked.setCheckedCars([...data.movedCars, ...data.errorCars]));
    }

    if (searchInput) {
      dispatch(actions.search.search(searchInput));
    }
  } catch (error) {
    dispatch(api.setLoading(false));
    dispatch(api.setError(true));
  }
};
