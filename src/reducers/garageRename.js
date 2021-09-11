import {
  GARAGERENAME_SET_NEW_NAME,
  GARAGERENAME_SET_NEW_DESC,
  GARAGERENAME_SET_OPEN_GARAGE,
  GARAGERENAME_SET_RENAME_BTN_DISABLED,
} from "../constants/actionTypes.js";
import createReducer from "./index.js";

export const initialState = {
  newName: "",
  newDesc: "",
  openGarage: null,
  isRenameBtnDisabled: true,
};

const handlers = {
  [GARAGERENAME_SET_NEW_NAME]: (state, action) => {
    return { ...state, newName: action.payload };
  },

  [GARAGERENAME_SET_NEW_DESC]: (state, action) => {
    return { ...state, newDesc: action.payload };
  },

  [GARAGERENAME_SET_OPEN_GARAGE]: (state, action) => {
    return { ...state, openGarage: action.payload };
  },

  [GARAGERENAME_SET_RENAME_BTN_DISABLED]: (state, action) => {
    return { ...state, isRenameBtnDisabled: action.payload };
  },
};

const reducer = createReducer(initialState, handlers);

export default reducer;
