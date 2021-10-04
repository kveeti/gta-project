import {
  GARAGEMODIFY_API_FAILURE,
  GARAGEMODIFY_API_LOADING,
  GARAGEMODIFY_API_SUCCESS,
  GARAGEMODIFY_SET_DELETING_GARAGE,
  GARAGEMODIFY_SET_NEW_DESC,
  GARAGEMODIFY_SET_OPEN_GARAGE,
  GARAGEMODIFY_SET_RENAME_BTN_DISABLED,
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
  [GARAGEMODIFY_SET_NEW_DESC]: (state, action) => {
    return { ...state, newDesc: action.payload };
  },

  [GARAGEMODIFY_SET_OPEN_GARAGE]: (state, action) => {
    return { ...state, openGarage: action.payload };
  },

  [GARAGEMODIFY_SET_RENAME_BTN_DISABLED]: (state, action) => {
    return { ...state, isRenameBtnDisabled: action.payload };
  },

  [GARAGEMODIFY_API_LOADING]: (state, action) => {
    return {
      ...state,
      api: {
        ...state.api,
        loading: action.payload,
      },
    };
  },

  [GARAGEMODIFY_API_SUCCESS]: (state, action) => {
    return {
      ...state,
      api: {
        ...state.api,
        success: action.payload,
      },
    };
  },

  [GARAGEMODIFY_API_FAILURE]: (state, action) => {
    return {
      ...state,
      api: {
        ...state.api,
        failure: action.payload,
      },
    };
  },

  [GARAGEMODIFY_SET_DELETING_GARAGE]: (state, action) => {
    return {
      ...state,
      garageBeingDeleted: action.payload,
    };
  },
};

const reducer = createReducer(initialState, handlers);

export default reducer;
