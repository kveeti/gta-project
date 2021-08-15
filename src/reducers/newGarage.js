import {
  NEW_GARAGE_SET_DESC,
  NEW_GARAGE_SET_NAME,
} from "../constants/actionTypes";

const init = {
  name: "",
  desc: "",
};

const newGarageReducer = (state = init, action) => {
  switch (action.type) {
    case NEW_GARAGE_SET_NAME:
      return { ...state, name: action.payload };

    case NEW_GARAGE_SET_DESC:
      return { ...state, desc: action.payload };

    default:
      return state;
  }
};

export default newGarageReducer;
