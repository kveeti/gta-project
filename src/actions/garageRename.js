import axios from "axios";
import { apiUrl } from "../config.js";
import {
  GARAGERENAME_API_FAILURE,
  GARAGERENAME_API_LOADING,
  GARAGERENAME_API_SUCCESS,
  GARAGERENAME_SET_NEW_DESC,
  GARAGERENAME_SET_OPEN_GARAGE,
  GARAGERENAME_SET_RENAME_BTN_DISABLED,
} from "../constants/actionTypes.js";
import { search } from "./search.js";

export const garageRename_setNewDesc = (value) => {
  return { type: GARAGERENAME_SET_NEW_DESC, payload: value };
};

export const garageRename_setOpenGarage = (value) => {
  return { type: GARAGERENAME_SET_OPEN_GARAGE, payload: value };
};

export const garageRename_setRenameBtnDisabled = (value) => {
  return { type: GARAGERENAME_SET_RENAME_BTN_DISABLED, payload: value };
};

export const garageRename_rename =
  (newDesc, garageId, searchInput) => async (dispatch) => {
    try {
      await axios.patch(`${apiUrl}/gta-api/garages/${garageId}`, {
        newDesc,
      });

      dispatch(search(searchInput));
      dispatch(garageRename_setOpenGarage(null));
    } catch {
      console.log("rename error");
    }
  };

export const garageRename_api_setLoading = (value) => {
  return { type: GARAGERENAME_API_LOADING, payload: value };
};

export const garageRename_api_setSuccess = (value) => {
  return { type: GARAGERENAME_API_SUCCESS, payload: value };
};

export const garageRename_api_setFailure = (value) => {
  return { type: GARAGERENAME_API_FAILURE, payload: value };
};
