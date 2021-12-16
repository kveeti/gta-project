import axios from "axios";
import { ICar, ModelCar } from "../../interfaces/Car";
import { IGarage, ModelGarage } from "../../interfaces/Garage";
import { constants } from "../actionTypes";
import { getNextAxiosConfig } from "./axiosConfig";

export const set = {
  chosenGarage: (garage: IGarage) => {
    return {
      type: constants.new.car.set.chosen.GARAGE,
      payload: garage,
    };
  },
  garages: {
    matching: (garages: ModelGarage[]) => {
      return {
        type: constants.new.car.set.garages.MATCHING,
        payload: garages,
      };
    },
    api: {
      setLoading: (loading: boolean) => {
        return {
          type: constants.new.car.set.garages.api.LOADING,
          payload: loading,
        };
      },
      setError: (error: boolean) => {
        return {
          type: constants.new.car.set.garages.api.ERROR,
          payload: error,
        };
      },
    },
  },
  input: {
    garage: (input: string) => {
      return {
        type: constants.new.car.set.input.GARAGE,
        payload: input,
      };
    },
    desc: (input: string) => {
      return {
        type: constants.new.car.set.input.CAR,
        payload: input,
      };
    },
  },
  api: {
    setSaving: (saving: boolean) => {
      return {
        type: constants.new.car.set.api.SAVING,
        payload: saving,
      };
    },
    setError: (error: boolean) => {
      return {
        type: constants.new.car.set.api.ERROR,
        payload: error,
      };
    },
  },
};

export const reset = () => {
  return {
    type: constants.new.car.RESET,
  };
};

export const search = {
  garages: (query: string) => async (dispatch) => {
    try {
      if (!query) return;

      dispatch(set.garages.api.setLoading(true));
      const response = await axios(getNextAxiosConfig(`/search/garages?q=${query}`, "GET"));
      dispatch(set.garages.api.setLoading(false));

      dispatch(set.garages.matching(response.data.garages));
    } catch (error) {
      dispatch(set.garages.api.setLoading(false));
      dispatch(set.garages.api.setError(true));
    }
  },
};

export const save = (chosenCarId: string, chosenGarageId: string) => async (dispatch) => {
  try {
    if (!chosenCarId || !chosenGarageId) return;

    dispatch(set.api.setSaving(true));
    await axios(
      getNextAxiosConfig(`/cars`, "POST", {
        modelCarId: chosenCarId,
        garageId: chosenGarageId,
      })
    );
    dispatch(set.api.setSaving(false));
  } catch (error) {
    dispatch(set.api.setSaving(false));
    dispatch(set.api.setError(true));
  }
};
