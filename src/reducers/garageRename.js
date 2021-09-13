import {
  GARAGERENAME_API_FAILURE,
  GARAGERENAME_API_LOADING,
  GARAGERENAME_API_SUCCESS,
  GARAGERENAME_SET_NEW_DESC,
  GARAGERENAME_SET_OPEN_GARAGE,
  GARAGERENAME_SET_RENAME_BTN_DISABLED,
} from "../constants/actionTypes.js";
import createReducer from "./index.js";

export const initialState = {
  newDesc: "",
  openGarage: null,
  isRenameBtnDisabled: true,
  api: {
    loading: false,
    success: false,
    failure: false,
  },
};

const handlers = {
  [GARAGERENAME_SET_NEW_DESC]: (state, action) => {
    return { ...state, newDesc: action.payload };
  },

  [GARAGERENAME_SET_OPEN_GARAGE]: (state, action) => {
    return { ...state, openGarage: action.payload };
  },

  [GARAGERENAME_SET_RENAME_BTN_DISABLED]: (state, action) => {
    return { ...state, isRenameBtnDisabled: action.payload };
  },

  [GARAGERENAME_API_LOADING]: (state, action) => {
    return {
      ...state,
      api: {
        ...state.api,
        loading: action.payload,
      },
    };
  },

  [GARAGERENAME_API_SUCCESS]: (state, action) => {
    return {
      ...state,
      api: {
        ...state.api,
        success: action.payload,
      },
    };
  },

  [GARAGERENAME_API_FAILURE]: (state, action) => {
    return {
      ...state,
      api: {
        ...state.api,
        failure: action.payload,
      },
    };
  },
};

const reducer = createReducer(initialState, handlers);

export default reducer;
