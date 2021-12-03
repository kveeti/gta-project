import { useDispatch, useSelector } from "react-redux";

import { Button } from "@material-ui/core/";

import { useBtnStyles } from "../../../styles/buttonStyles";
import {
  newGarage_setDesc,
  newGarage_setName,
} from "../../../actions/newGarage";

const ClearButton = () => {
  const dispatch = useDispatch();
  const btnClasses = useBtnStyles();

  const nameInput = useSelector((state) => state.newGarage.name);
  const descInput = useSelector((state) => state.newGarage.desc);

  const handleClick = (e) => {
    dispatch(newGarage_setDesc(""));
    dispatch(newGarage_setName(""));
  };

  return (
    <div className={btnClasses.ccRoot}>
      <div className={btnClasses.ccWrapper}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClick}
          className={btnClasses.clearButton}
          disabled={!nameInput && !descInput ? true : false}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ClearButton;
