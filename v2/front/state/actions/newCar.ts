import axios from "axios";
import { ICar, ModelCar } from "../../interfaces/Car";
import { IGarage, ModelGarage } from "../../interfaces/Garage";
import { constants } from "../actionTypes";
import { getNextAxiosConfig } from "./axiosConfig";

export const set = {
  chosen: {
    car: (car: ICar) => {
      return {
        type: constants.new.car.set.chosen.CAR,
        payload: car,
      };
    },
    garage: (garage: IGarage) => {
      return {
        type: constants.new.car.set.chosen.GARAGE,
        payload: garage,
      };
    },
  },
  cars: {
    matching: (cars: ModelCar[]) => {
      return {
        type: constants.new.car.set.cars.MATCHING,
        payload: cars,
      };
    },
    api: {
      setLoading: (loading: boolean) => {
        return {
          type: constants.new.car.set.cars.api.LOADING,
          payload: loading,
        };
      },
      setError: (error: boolean) => {
        return {
          type: constants.new.car.set.cars.api.ERROR,
          payload: error,
        };
      },
    },
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
    car: (input: string) => {
      return {
        type: constants.new.car.set.input.CAR,
        payload: input,
      };
    },
    garage: (input: string) => {
      return {
        type: constants.new.car.set.input.GARAGE,
        payload: input,
      };
    },
  },
  dialog: (open: boolean) => {
    return {
      type: constants.new.car.set.dialog.OPEN,
      payload: open,
    };
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
  cars: (query: string) => async (dispatch) => {
    try {
      if (!query) return;

      dispatch(set.cars.api.setLoading(true));
      const response = await axios(getNextAxiosConfig(`/search/cars?q=${query}`, "GET"));
      dispatch(set.cars.api.setLoading(false));

      dispatch(set.cars.matching(response.data.modelCars));
    } catch (error) {
      dispatch(set.cars.api.setLoading(false));
      dispatch(set.cars.api.setError(true));
    }
  },
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
    console.log(chosenCarId, chosenGarageId);

    if (!chosenCarId) return;
    if (!chosenGarageId) return;

    dispatch(set.api.setSaving(true));
    const response = await axios(
      getNextAxiosConfig(`/cars`, "POST", {
        modelCarId: chosenCarId,
        garageId: chosenGarageId,
      })
    );
    dispatch(set.api.setSaving(false));

    dispatch(set.cars.matching(response.data.modelCars));
  } catch (error) {
    dispatch(set.api.setSaving(false));
    dispatch(set.api.setError(true));
  }
};
