import {
  GARAGERENAME_SET_NEW_DESC,
  GARAGERENAME_SET_NEW_NAME,
  GARAGERENAME_SET_OPEN_GARAGE,
  GARAGERENAME_SET_RENAME_BTN_DISABLED,
} from "../constants/actionTypes.js";

export const garageRename_setNewName = (value) => {
  return { type: GARAGERENAME_SET_NEW_NAME, payload: value };
};

export const garageRename_setNewDesc = (value) => {
  return { type: GARAGERENAME_SET_NEW_DESC, payload: value };
};

export const garageRename_setOpenGarage = (value) => {
  return { type: GARAGERENAME_SET_OPEN_GARAGE, payload: value };
};

export const garageRename_setRenameBtnDisabled = (value) => {
  return { type: GARAGERENAME_SET_RENAME_BTN_DISABLED, payload: value };
};
