import { useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import { moveCar_clear } from "../../../actions/moveCar";
import { useStyles } from "../../../styles/buttonStyles";

const ClearButton = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Button
      className={classes.clearButton}
      variant="outlined"
      size="small"
      onClick={() => {
        dispatch(moveCar_clear());
      }}
    >
      Clear cars
    </Button>
  );
};

export default ClearButton;
