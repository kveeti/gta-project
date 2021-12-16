import axios from "axios";
import { ICar, ModelCar } from "../../interfaces/Car";
import { IGarage, ModelGarage } from "../../interfaces/Garage";
import { constants } from "../actionTypes";
import { getNextAxiosConfig } from "./axiosConfig";

export const set = {
  chosenGarage: (garage: IGarage) => {
    return {
      type: constants.new.garage.set.CHOSEN_GARAGE,
      payload: garage,
    };
  },
  garages: {
    matching: (garages: ModelGarage[]) => {
      return {
        type: constants.new.garage.set.garages.MATCHING,
        payload: garages,
      };
    },
    api: {
      setLoading: (loading: boolean) => {
        return {
          type: constants.new.garage.set.garages.api.LOADING,
          payload: loading,
        };
      },
      setError: (error: boolean) => {
        return {
          type: constants.new.garage.set.garages.api.ERROR,
          payload: error,
        };
      },
    },
  },
  input: {
    garage: (input: string) => {
      return {
        type: constants.new.garage.set.input.GARAGE,
        payload: input,
      };
    },
    desc: (input: string) => {
      return {
        type: constants.new.garage.set.input.DESC,
        payload: input,
      };
    },
  },
  api: {
    setSaving: (saving: boolean) => {
      return {
        type: constants.new.garage.set.api.SAVING,
        payload: saving,
      };
    },
    setError: (error: boolean) => {
      return {
        type: constants.new.garage.set.api.ERROR,
        payload: error,
      };
    },
  },
};

export const reset = () => {
  return {
    type: constants.new.garage.RESET,
  };
};

export const search = {
  garages: (query: string) => async (dispatch) => {
    try {
      if (!query) return;

      dispatch(set.garages.api.setLoading(true));
      const response = await axios(getNextAxiosConfig(`/search/modelgarages?q=${query}`, "GET"));
      dispatch(set.garages.api.setLoading(false));

      dispatch(set.garages.matching(response.data.modelGarages));
    } catch (error) {
      dispatch(set.garages.api.setLoading(false));
      dispatch(set.garages.api.setError(true));
    }
  },
};

export const save = (chosenGarageId: string) => async (dispatch) => {
  try {
    if (!chosenGarageId) return;

    dispatch(set.api.setSaving(true));
    await axios(
      getNextAxiosConfig(`/garages`, "POST", {
        modelGarageId: chosenGarageId,
      })
    );
    dispatch(set.api.setSaving(false));
  } catch (error) {
    dispatch(set.api.setSaving(false));
    dispatch(set.api.setError(true));
  }
};
