import {
  NEW_GARAGE_SET_NAME,
  NEW_GARAGE_SET_DESC,
} from "../constants/actionTypes";

export const newGarage_setName = (garageName) => {
  return { type: NEW_GARAGE_SET_NAME, payload: garageName };
};

export const newGarage_setDesc = (garageDesc) => {
  return { type: NEW_GARAGE_SET_DESC, payload: garageDesc };
};
