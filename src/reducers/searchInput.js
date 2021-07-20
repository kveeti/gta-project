import { SET_SEARCH_INPUT } from "../constants/actionTypes";

const searchInputReducer = (searchInput = "", action) => {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return action.payload;

    default:
      return searchInput;
  }
};

export default searchInputReducer;
