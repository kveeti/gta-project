import {
  NEW_GARAGE_API_FAILURE,
  NEW_GARAGE_API_LOADING,
  NEW_GARAGE_API_SUCCESS,
  NEW_GARAGE_SET_DESC,
  NEW_GARAGE_SET_NAME,
} from "../constants/actionTypes";

const init = {
  name: "",
  desc: "",
  api: {
    success: false,
    failure: false,
    loading: false,
  },
};

const newGarageReducer = (state = init, action) => {
  switch (action.type) {
    case NEW_GARAGE_SET_NAME:
      return { ...state, name: action.payload };

    case NEW_GARAGE_SET_DESC:
      return { ...state, desc: action.payload };

    case NEW_GARAGE_API_LOADING:
      return { ...state, api: { ...state.api, loading: action.payload } };

    case NEW_GARAGE_API_FAILURE:
      return { ...state, api: { ...state.api, failure: action.payload } };

    case NEW_GARAGE_API_SUCCESS:
      return { ...state, api: { ...state.api, success: action.payload } };

    default:
      return state;
  }
};

export default newGarageReducer;
