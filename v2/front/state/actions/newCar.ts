import axios from "axios";
import { toast } from "react-toastify";
import { ICar, ModelCar } from "../../interfaces/Car";
import { IGarage, ModelGarage } from "../../interfaces/Garage";
import { config } from "../../util/axios";
import { constants } from "../actionTypes";

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
      const response = await axios(config(`/modelcars?query=${query}`, "GET"));
      dispatch(set.cars.api.setLoading(false));

      dispatch(set.cars.matching(response.data));
    } catch (error) {
      dispatch(set.cars.api.setLoading(false));
      dispatch(set.cars.api.setError(true));
    }
  },
  garages: (query: string) => async (dispatch) => {
    try {
      if (!query) return;

      dispatch(set.garages.api.setLoading(true));
      const response = await axios(config(`/garages?query=${query}`, "GET"));
      dispatch(set.garages.api.setLoading(false));

      dispatch(set.garages.matching(response.data));
    } catch (error) {
      dispatch(set.garages.api.setLoading(false));
      dispatch(set.garages.api.setError(true));
    }
  },
};

export const save = (chosenCar: ICar, chosenGarage: IGarage) => async (dispatch) => {
  try {
    if (!chosenCar || !chosenGarage) return;

    dispatch(set.api.setSaving(true));
    await axios(
      config(`/cars`, "POST", {
        modelCarId: chosenCar.id,
        garageId: chosenGarage.id,
      })
    );
    dispatch(set.api.setSaving(false));
    toast.success(`Successfully saved ${chosenCar.name} to ${chosenGarage.name}`);
    dispatch(reset());
  } catch (error) {
    dispatch(set.api.setSaving(false));
    dispatch(set.api.setError(true));
    toast.error(`Error saving ${chosenCar.name} to ${chosenGarage.name}`);
  }
};
