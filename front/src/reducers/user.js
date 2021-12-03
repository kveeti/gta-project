import {
  AUTH_API_STATUS,
  LOGIN,
  LOGOUT,
  SET_LOGGED_IN,
} from "../constants/actionTypes";

const initialState = {
  loggedIn: false,
  api: {
    success: null,
    message: null,
    loading: true,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      };

    case LOGOUT:
      return initialState;

    case SET_LOGGED_IN:
      return { ...state, loggedIn: action.payload };

    case AUTH_API_STATUS:
      return { ...state, api: action.payload };

    default:
      return state;
  }
};

export default userReducer;
