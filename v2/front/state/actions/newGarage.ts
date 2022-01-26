import axios from "axios";
import { toast } from "react-toastify";
import { actions } from ".";
import { ModelGarage } from "../../interfaces/Garage";
import { request } from "../../util/axios";
import { constants } from "../actionTypes";

export const set = {
  chosenGarage: (garage: ModelGarage) => {
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
    if (!query) return;

    dispatch(set.garages.api.setLoading(true));
    const res = await request(`/modelgarages?query=${query}`, "GET");
    dispatch(set.garages.api.setLoading(false));

    if (res) {
      dispatch(set.garages.matching(res.data));
    } else {
      dispatch(set.garages.api.setError(true));
    }
  },
};

export const save = (chosenGarage: ModelGarage, description: string) => async (dispatch) => {
  if (!chosenGarage) return;

  dispatch(set.api.setSaving(true));
  const res = await request(`/garages`, "POST", {
    modelGarageId: chosenGarage.id,
    desc: description,
  });
  dispatch(set.api.setSaving(false));

  if (res) {
    dispatch(actions.users.get.me());

    toast.success(`${chosenGarage.name} saved successfully`);
    dispatch(reset());
  } else {
    dispatch(set.api.setError(true));
    toast.error("Something went wrong, no changes were made.");
  }
};
