import { IS_MOVING, FORCE_IS_MOVING } from "../constants/actionTypes";

const isMovingReducer = (isMoving = false, action) => {
  switch (action.type) {
    case IS_MOVING:
      return !isMoving;

    case FORCE_IS_MOVING:
      return action.payload;

    default:
      return isMoving;
  }
};

export default isMovingReducer;
