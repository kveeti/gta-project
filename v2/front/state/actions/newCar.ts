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
  model: {
    cars: {
      matching: (cars: ModelCar[]) => {
        return {
          type: constants.new.car.set.model.cars.MATCHING,
          payload: cars,
        };
      },
      api: {
        setLoading: (loading: boolean) => {
          return {
            type: constants.new.car.set.model.cars.api.LOADING,
            payload: loading,
          };
        },
        setError: (error: boolean) => {
          return {
            type: constants.new.car.set.model.cars.api.ERROR,
            payload: error,
          };
        },
      },
    },
    garages: {
      matching: (garages: ModelGarage[]) => {
        return {
          type: constants.new.car.set.model.garages.MATCHING,
          payload: garages,
        };
      },
      api: {
        setLoading: (loading: boolean) => {
          return {
            type: constants.new.car.set.model.garages.api.LOADING,
            payload: loading,
          };
        },
        setError: (error: boolean) => {
          return {
            type: constants.new.car.set.model.garages.api.ERROR,
            payload: error,
          };
        },
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
};

export const reset = () => {
  return {
    type: constants.new.car.RESET,
  };
};

export const search = {
  modelCars: (query: string) => async (dispatch) => {
    try {
      if (!query) return;

      dispatch(set.model.cars.api.setLoading(true));
      const response = await axios(getNextAxiosConfig(`/search/model/cars?q=${query}`, "GET"));
      dispatch(set.model.cars.api.setLoading(false));

      dispatch(set.model.cars.matching(response.data.modelCars));
    } catch (error) {
      dispatch(set.model.cars.api.setLoading(false));
      dispatch(set.model.cars.api.setError(true));
    }
  },
  modelGarages: (query: string) => async (dispatch) => {
    try {
      dispatch(set.model.garages.api.setLoading(true));
      const response = await axios(getNextAxiosConfig(`/search/model/garages?q=${query}`, "GET"));
      dispatch(set.model.garages.api.setLoading(false));

      dispatch(set.model.garages.matching(response.data.modelGarages));
    } catch (error) {
      dispatch(set.model.garages.api.setLoading(false));
      dispatch(set.model.garages.api.setError(true));
    }
  },
};
