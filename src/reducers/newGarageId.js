import { NEW_GARAGE_ID } from "../constants/actionTypes";

const newGarageIdReducer = (newGarageId = null, action) => {
  switch (action.type) {
    case NEW_GARAGE_ID:
      return action.payload;

    default:
      return newGarageId;
  }
};

export default newGarageIdReducer;
