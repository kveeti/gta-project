import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import { isMoving } from "../../../actions/moveCar.js";

const MoveButton = () => {
  const dispatch = useDispatch();

  const isMovingState = useSelector((state) => state.isMoving);
  const carsToMove = useSelector((state) => state.carsToMove);

  return (
    <Button
      size="small"
      color="primary"
      variant="contained"
      style={{ marginBottom: "8.5px", width: "100%" }}
      onClick={() => {
        dispatch(isMoving());
      }}
    >
      {isMovingState
        ? "Return"
        : carsToMove.length > 1
        ? `Move - ${carsToMove.length} cars selected`
        : `Move - ${carsToMove.length} car selected`}
    </Button>
  );
};

export default MoveButton;
