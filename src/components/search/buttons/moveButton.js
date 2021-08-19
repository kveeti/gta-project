import { useSelector, useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import { isMoving } from "../../../actions/moveCar.js";
import { useStyles } from "../../../styles/buttonStyles.js";

const MoveButton = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const isMovingState = useSelector((state) => state.moveCar.isMoving);
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);

  return (
    <Button
      className={classes.buttons}
      size="small"
      color="primary"
      variant="contained"
      style={{ width: "100%", marginTop: "8px" }}
      onClick={() => {
        dispatch(isMoving());
      }}
    >
      {isMovingState
        ? "Return"
        : carsToMove.length > 1
        ? `Move menu - ${carsToMove.length} cars selected`
        : `Move menu - ${carsToMove.length} car selected`}
    </Button>
  );
};

export default MoveButton;
