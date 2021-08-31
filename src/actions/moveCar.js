import axios from "axios";

import {
  MOVE_CAR_IS_MOVING,
  MOVE_CAR_FORCE_IS_MOVING,
  MOVE_CAR_CHECK_MOVE_LIST,
  MOVE_CAR_SET_GARAGES,
  MOVE_CAR_SET_GARAGE_INPUT,
  MOVE_CAR_CHECK_CHOSEN_GARAGE,
  MOVE_CAR_CLEAR,
  MOVE_CAR_CHECK_ERROR_CAR,
  MOVE_CAR_API_LOADING,
  MOVE_CAR_API_FAILURE,
  MOVE_CAR_API_SUCCESS,
} from "../constants/actionTypes";

import config from ".././config.json";
import { search } from "./search";

export const isMoving = () => {
  return {
    type: MOVE_CAR_IS_MOVING,
  };
};

export const forceIsMoving = (forcedState) => {
  return {
    type: MOVE_CAR_FORCE_IS_MOVING,
    payload: forcedState,
  };
};

export const moveCar_checkCar = (car) => {
  return { type: MOVE_CAR_CHECK_MOVE_LIST, payload: car };
};

export const moveCar_setGarages = (garages) => {
  return { type: MOVE_CAR_SET_GARAGES, payload: garages };
};

export const moveCar_setGarageInput = (input) => {
  return { type: MOVE_CAR_SET_GARAGE_INPUT, payload: input };
};

export const moveCar_checkChosenGarage = (garage) => {
  return { type: MOVE_CAR_CHECK_CHOSEN_GARAGE, payload: garage };
};

export const moveCar_clear = () => {
  return { type: MOVE_CAR_CLEAR };
};

export const moveCar_checkErrorCar = (errorCar) => {
  return { type: MOVE_CAR_CHECK_ERROR_CAR, payload: errorCar };
};

export const moveCar_searchGarages = (query) => async (dispatch) => {
  if (!query) return;

  try {
    const res = await axios.get(`${config.API_URL}/gta-api/garages`, {
      params: { q: query },
    });

    dispatch(moveCar_setGarages(res.data.garages));
  } catch {
    console.log("search error");
  }
};

export const moveCar_move =
  (carsToMove, chosenGarageId, searchInput) => async (dispatch) => {
    try {
      const res = await axios.put(`${config.API_URL}/gta-api/cars/`, {
        cars: carsToMove,
        newGarageID: chosenGarageId,
      });

      console.log(res.data.status);

      switch (res.data.status) {
        case "none":
          noneCarsHandler(dispatch, res.data.errorCars);
          break;

        case "some":
          someCarsHandler(
            dispatch,
            res.data.movedCars,
            res.data.errorCars,
            searchInput
          );
          break;
        case "every":
          everyCarHandler(dispatch, res.data.movedCars, searchInput);
          break;

        default:
          break;
      }
    } catch {
      movingFailure(carsToMove);
    }
  };

export const moveCar_api_setLoading = (value) => {
  return { type: MOVE_CAR_API_LOADING, payload: value };
};

const setFailure = (value) => {
  return { type: MOVE_CAR_API_FAILURE, payload: value };
};

const setSuccess = (value) => {
  return { type: MOVE_CAR_API_SUCCESS, payload: value };
};

const movingFailure = (dispatch, carsToMove) => {
  setTimeout(() => {
    dispatch(setFailure(true));

    setTimeout(() => {
      dispatch(moveCar_api_setLoading(false));

      for (const car of carsToMove) {
        dispatch(moveCar_checkErrorCar(car));
      }

      setTimeout(() => {
        dispatch(setFailure(false));

        for (const car of carsToMove) {
          dispatch(moveCar_checkErrorCar(car));
        }
      }, 7000);
    }, 2000);
  }, 2500);
};

const noneCarsHandler = (dispatch, errorCars) => {
  setTimeout(() => {
    dispatch(setFailure(true));

    setTimeout(() => {
      for (const car of errorCars) {
        dispatch(moveCar_checkErrorCar(car));
      }

      dispatch(moveCar_api_setLoading(false));
    }, 1000);

    setTimeout(() => {
      dispatch(setFailure(false));

      for (const car of errorCars) {
        dispatch(moveCar_checkErrorCar(car));
      }
    }, 5000);
  }, 1000);
};

const someCarsHandler = (dispatch, movedCars, errorCars, searchInput) => {
  setTimeout(() => {
    dispatch(moveCar_api_setLoading(false));
    dispatch(setSuccess(true));

    setTimeout(() => {
      for (const movedCar of movedCars) {
        dispatch(moveCar_checkCar(movedCar));
      }

      dispatch(setSuccess(false));
      dispatch(setFailure(true));
      dispatch(search(searchInput));

      for (const errorCar of errorCars) {
        dispatch(moveCar_checkErrorCar(errorCar));
      }

      setTimeout(() => {
        dispatch(setFailure(false));
        for (const errorCar of errorCars) {
          dispatch(moveCar_checkErrorCar(errorCar));
        }
      }, 5000);
    }, 800);
  }, 600);
};

const everyCarHandler = (dispatch, movedCars, searchInput) => {
  const checkedCars = [];

  setTimeout(() => {
    dispatch(moveCar_api_setLoading(false));
    dispatch(setSuccess(true));

    setTimeout(() => {
      for (const movedCar of movedCars) {
        dispatch(moveCar_checkCar(movedCar));
        checkedCars.push(movedCar);
      }

      dispatch(search(searchInput));

      if (checkedCars.length === movedCars.length) {
        dispatch(moveCar_clear());
      }
    }, 800);

    setTimeout(() => {
      dispatch(setSuccess(false));
    }, 3000);
  }, 600);
};
