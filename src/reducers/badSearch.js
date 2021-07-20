import { BAD_SEARCH } from "../constants/actionTypes.js";

const badSearchReducer = (state = false, action) => {
  switch (action.type) {
    case BAD_SEARCH:
      return action.payload;

    default:
      return state;
  }
};

export default badSearchReducer;
