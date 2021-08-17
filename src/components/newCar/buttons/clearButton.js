import { Button } from "@material-ui/core/";

import { useDispatch, useSelector } from "react-redux";

import { newCar_clearAll } from "../../../actions/newCar";

import { useStyles } from "../../../styles/buttonStyles";

const ClearButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const garage = useSelector((state) => state.newCar.chosenGarage);
  const possibleCar = useSelector((state) => state.newCar.chosenPossibleCar);

  const handleClick = (e) => {
    dispatch(newCar_clearAll());
  };

  return (
    <div className={classes.ccRoot}>
      <div className={classes.ccWrapper}>
        <Button
          className={classes.clearButton}
          variant="outlined"
          size="medium"
          disabled={!garage || !possibleCar ? true : false}
          onClick={handleClick}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ClearButton;
