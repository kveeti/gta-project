import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { Button, CircularProgress } from "@material-ui/core";

import { moveCar_api_setLoading, moveCar_move } from "../../../actions/moveCar";
import { useBtnStyles } from "../../../styles/buttonStyles";

const MoveButton = () => {
  const dispatch = useDispatch();
  const btnClasses = useBtnStyles();

  const searchInput = useSelector((state) => state.search.input);
  const chosenGarage = useSelector((state) => state.moveCar.chosenGarage);
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);
  const api = useSelector((state) => state.moveCar.api);

  const buttonClassname = clsx({
    [btnClasses.buttonSuccess]: api.success,
    [btnClasses.buttonFailure]: api.failure,
    [btnClasses.buttons]: !api.success && !api.failure,
  });

  const buttonProgress = clsx({
    [btnClasses.buttonProgress]: true,
    [btnClasses.buttonProgressFailure]: api.failure,
  });

  const handleClick = async () => {
    dispatch(moveCar_api_setLoading(true));
    dispatch(moveCar_move(carsToMove, chosenGarage._id, searchInput));
  };

  return (
    <>
      <div className={btnClasses.ccRoot}>
        <div className={btnClasses.ccWrapper}>
          <Button
            className={buttonClassname}
            style={{ marginBottom: "4px" }}
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            disabled={!chosenGarage || api.loading ? true : false}
            onClick={handleClick}
            fullWidth
          >
            {carsToMove.length > 1
              ? `Move ${carsToMove.length} cars`
              : `Move ${carsToMove.length} car`}
          </Button>
          {api.loading && (
            <CircularProgress size={24} className={buttonProgress} />
          )}
        </div>
      </div>
    </>
  );
};

export default MoveButton;
