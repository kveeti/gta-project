import { useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import { moveCar_clear } from "../../../actions/moveCar";
import { useStyles } from "../../../styles/buttonStyles";

const ClearButton = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      <div className={classes.ccRoot}>
        <div className={classes.ccWrapper}>
          <Button
            className={classes.clearButton}
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => {
              dispatch(moveCar_clear());
            }}
          >
            Clear cars
          </Button>
        </div>
      </div>
    </>
  );
};

export default ClearButton;
