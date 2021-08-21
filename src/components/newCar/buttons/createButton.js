import { useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@material-ui/core/";
import CircularProgress from "@material-ui/core/CircularProgress";

import { newCar_clearAll } from "../../../actions/newCar";
import { useStyles } from "../../../styles/buttonStyles";

const config = require("../../../config.json");

const CreateButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonFailure]: failure,
    [classes.buttons]: !success && !failure,
  });

  const buttonProgress = clsx({
    [classes.buttonProgress]: true,
    [classes.buttonProgressFailure]: failure,
  });

  const chosenGarage = useSelector((state) => state.newCar.chosenGarage);
  const chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );

  const handleClick = async () => {
    try {
      setLoading(true);
      await axios.post(`${config.API_URL}/gta-api/cars`, {
        carId: chosenPossibleCar._id,
        garageId: chosenGarage._id,
      });

      creationSuccess();
    } catch (err) {
      creationFailure();
    }
  };

  const creationSuccess = () => {
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        dispatch(newCar_clearAll());
      }, 800);

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }, 600);
  };

  const creationFailure = () => {
    setTimeout(() => {
      setFailure(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, 2500);

    setTimeout(() => {
      setFailure(false);
    }, 7000);
  };

  return (
    <>
      <div className={classes.ccRoot}>
        <div className={classes.ccWrapper}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            disableElevation
            className={buttonClassname}
            disabled={
              !chosenGarage || !chosenPossibleCar || loading ? true : false
            }
            onClick={handleClick}
          >
            Create
          </Button>
          {loading && <CircularProgress size={24} className={buttonProgress} />}
        </div>
      </div>
    </>
  );
};

export default CreateButton;
