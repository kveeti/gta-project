import { SET_NEW_GARAGE_NAME } from '../constants/actionTypes'

const newGarageNameReducer = (input = "", action) => {
  switch (action.type) {
    case SET_NEW_GARAGE_NAME:
      return action.payload;

    default:
      return input;
  }
}

export default newGarageNameReducer;