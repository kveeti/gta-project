import { useEffect, useRef, useState } from "react";
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

  const timeouts = useRef([]);

  useEffect(() => {
    console.log("clearing");
    const toClearTimeouts = timeouts.current;

    return () => {
      for (const timeout of toClearTimeouts) {
        clearTimeout(timeout);
      }
    };
  }, []);

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
    const t1 = setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      const t2 = setTimeout(() => {
        dispatch(newCar_clearAll());
      }, 800);

      const t3 = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      timeouts.current.push(t1, t2, t3);
    }, 600);
  };

  const creationFailure = () => {
    const t1 = setTimeout(() => {
      setFailure(true);

      const t2 = setTimeout(() => {
        setLoading(false);
      }, 2000);

      timeouts.current.push(t1, t2);
    }, 2500);

    const t3 = setTimeout(() => {
      setFailure(false);
    }, 7000);

    timeouts.current.push(t3);
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
