import { useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import { moveCar_clear } from "../../../actions/moveCar";
import { useBtnStyles } from "../../../styles/buttonStyles";

const ClearButton = () => {
  const dispatch = useDispatch();
  const btnClasses = useBtnStyles();

  return (
    <>
      <div className={btnClasses.ccRoot}>
        <div className={btnClasses.ccWrapper}>
          <Button
            className={btnClasses.clearButton}
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
