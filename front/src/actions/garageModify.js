import axios from "axios";
import { apiUrl } from "../config.js";
import {
  GARAGEMODIFY_API_FAILURE,
  GARAGEMODIFY_API_LOADING,
  GARAGEMODIFY_API_SUCCESS,
  GARAGEMODIFY_SET_DELETING_GARAGE,
  GARAGEMODIFY_SET_NEW_DESC,
  GARAGEMODIFY_SET_OPEN_GARAGE,
  GARAGEMODIFY_SET_RENAME_BTN_DISABLED,
} from "../constants/actionTypes.js";
import { search } from "./search.js";

export const garageModify_setNewDesc = (value) => {
  return { type: GARAGEMODIFY_SET_NEW_DESC, payload: value };
};

export const garageModify_setOpenGarage = (value) => {
  return { type: GARAGEMODIFY_SET_OPEN_GARAGE, payload: value };
};

export const garageModify_setRenameBtnDisabled = (value) => {
  return { type: GARAGEMODIFY_SET_RENAME_BTN_DISABLED, payload: value };
};

export const garageModify_rename =
  (newDesc, garageId, searchInput) => async (dispatch) => {
    try {
      await axios.patch(`${apiUrl}/gta-api/garages/${garageId}`, {
        newDesc,
      });

      dispatch(search(searchInput));
      dispatch(garageModify_setOpenGarage(null));
    } catch {
      console.log("rename error");
    }
  };

export const garageModify_api_setLoading = (value) => {
  return { type: GARAGEMODIFY_API_LOADING, payload: value };
};

export const garageModify_api_setSuccess = (value) => {
  return { type: GARAGEMODIFY_API_SUCCESS, payload: value };
};

export const garageModify_api_setFailure = (value) => {
  return { type: GARAGEMODIFY_API_FAILURE, payload: value };
};

export const garageModify_set_garage_being_deleted = (garageId) => {
  return { type: GARAGEMODIFY_SET_DELETING_GARAGE, payload: garageId };
};

export const garageModify_deleteGarage =
  (garageId, searchInput) => async (dispatch) => {
    try {
      await axios.delete(`${apiUrl}/gta-api/garages/${garageId}`);

      dispatch(search(searchInput));
      dispatch(garageModify_setOpenGarage(null));
    } catch {
      console.log("error deleting garage");
    }
  };
