import {
  IS_MOVING,
  CHECK_MOVE_LIST,
  CLEAR_MOVE_LIST,
  FORCE_IS_MOVING,
} from "../constants/actionTypes";
import axios from "axios";

import config from ".././config.json";

export const isMoving = () => {
  return {
    type: IS_MOVING,
  };
};

export const forceIsMoving = (forcedState) => {
  return {
    type: FORCE_IS_MOVING,
    payload: forcedState,
  };
};

export const checkCar = (car) => {
  return { type: CHECK_MOVE_LIST, payload: car };
};

export const clearMoveList = () => {
  return { type: CLEAR_MOVE_LIST };
};

export const move = (carList, garageId) => async (dispatch) => {
  await axios
    .put(`${config.API_URL}/gta-api/cars/`, {
      cars: carList,
      newGarageID: garageId,
    })
    .then((res) => {
      dispatch({ type: CLEAR_MOVE_LIST });
    })
    .catch((err) => {
      console.log("failed to move some or all of the cars");
    });
};
