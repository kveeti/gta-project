import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@material-ui/core/";
import CircularProgress from "@material-ui/core/CircularProgress";

import { newCar_addCar } from "../../../actions/newCar";
import { useBtnStyles } from "../../../styles/buttonStyles";

const CreateButton = () => {
  const btnClasses = useBtnStyles();
  const dispatch = useDispatch();

  const api = useSelector((state) => state.newCar.api);

  const buttonClassname = clsx({
    [btnClasses.buttonSuccess]: api.success,
    [btnClasses.buttonFailure]: api.failure,
    [btnClasses.buttons]: !api.success && !api.failure,
  });

  const buttonProgress = clsx({
    [btnClasses.buttonProgress]: true,
    [btnClasses.buttonProgressFailure]: api.failure,
  });

  const chosenGarage = useSelector((state) => state.newCar.chosenGarage);
  const chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );

  const handleClick = async () => {
    dispatch(newCar_addCar(chosenPossibleCar._id, chosenGarage._id));
  };

  return (
    <>
      <div className={btnClasses.ccRoot}>
        <div className={btnClasses.ccWrapper}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            disableElevation
            className={buttonClassname}
            disabled={
              !chosenGarage || !chosenPossibleCar || api.loading ? true : false
            }
            onClick={handleClick}
          >
            Create
          </Button>
          {api.loading && (
            <CircularProgress size={24} className={buttonProgress} />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateButton;
