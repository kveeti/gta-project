import { Button } from "@material-ui/core/";

import { useDispatch, useSelector } from "react-redux";

import { newCar_clearAll } from "../../../actions/newCar";

import { useBtnStyles } from "../../../styles/buttonStyles";

const ClearButton = () => {
  const btnClasses = useBtnStyles();
  const dispatch = useDispatch();

  const garageInput = useSelector((state) => state.newCar.garageName);
  const carInput = useSelector((state) => state.newCar.carName);

  const handleClick = (e) => {
    dispatch(newCar_clearAll());
  };

  return (
    <div className={btnClasses.ccRoot}>
      <div className={btnClasses.ccWrapper}>
        <Button
          className={btnClasses.clearButton}
          variant="outlined"
          size="medium"
          disabled={!garageInput && !carInput ? true : false}
          onClick={handleClick}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ClearButton;
