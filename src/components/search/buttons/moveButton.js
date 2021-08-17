import { useSelector, useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import { isMoving } from "../../../actions/moveCar.js";

const MoveButton = () => {
  const dispatch = useDispatch();

  const isMovingState = useSelector((state) => state.moveCar.isMoving);
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);

  return (
    <Button
      size="small"
      color="primary"
      variant="contained"
      style={{ marginBottom: "10.5px", width: "100%" }}
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
