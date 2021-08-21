import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import axios from "axios";

import { Button, CircularProgress } from "@material-ui/core";

import {
  moveCar_checkCar,
  moveCar_checkErrorCar,
  moveCar_clear,
} from "../../../actions/moveCar";
import { search } from "../../../actions/search";
import { useStyles } from "../../../styles/buttonStyles";

const MoveButton = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const timeouts = useRef([]);

  useEffect(() => {
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

  const searchInput = useSelector((state) => state.search.input);
  const chosenGarage = useSelector((state) => state.moveCar.chosenGarage);
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);

  const config = require("../../../config.json");

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await axios.put(`${config.API_URL}/gta-api/cars/`, {
        cars: carsToMove,
        newGarageID: chosenGarage._id,
      });

      if (res.data.status === "none") {
        noneCarsHandler(res);
        return;
      }
      if (res.data.status === "some") {
        someCarsHandler(res);
        return;
      }

      if (res.data.status === "every") {
        everyCarHandler();
        return;
      }
    } catch {
      movingFailure();
    }
  };

  const movingFailure = () => {
    const t1 = setTimeout(() => {
      setFailure(true);

      const t2 = setTimeout(() => {
        setLoading(false);

        for (const car of carsToMove) {
          moveCar_checkErrorCar(car);
        }

        const t3 = setTimeout(() => {
          setFailure(false);

          for (const car of carsToMove) {
            moveCar_checkErrorCar(car);
          }
        }, 7000);

        timeouts.current.push(t3);
      }, 2000);

      timeouts.current.push(t2);
    }, 2500);

    timeouts.current.push(t1);
  };

  const noneCarsHandler = (res) => {
    setFailure(true);

    const t1 = setTimeout(() => {
      setLoading(false);

      for (const car of res.data.errorCars) {
        dispatch(moveCar_checkErrorCar(car));
      }

      const t2 = setTimeout(() => {
        for (const car of res.data.errorCars) {
          dispatch(moveCar_checkErrorCar(car));
        }

        setFailure(false);
      }, 5000);

      timeouts.current.push(t2);
      timeouts.current.push(t1);
    }, 1000);
  };

  const someCarsHandler = (res) => {
    const t1 = setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      dispatch(search(searchInput));

      const t2 = setTimeout(() => {
        for (const movedCar of res.data.movedCars) {
          dispatch(moveCar_checkCar(movedCar));
        }

        setSuccess(false);
        setFailure(true);

        for (const errorCar of res.data.errorCars) {
          dispatch(moveCar_checkErrorCar(errorCar));
        }

        const t3 = setTimeout(() => {
          setFailure(false);
          for (const errorCar of res.data.errorCars) {
            dispatch(moveCar_checkErrorCar(errorCar));
          }
        }, 5000);

        timeouts.current.push(t3);
      }, 800);

      timeouts.current.push(t2);
    }, 600);

    timeouts.current.push(t1);
  };

  const everyCarHandler = () => {
    const t1 = setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      const t2 = setTimeout(() => {
        dispatch(moveCar_clear());
        if (!searchInput) return;
        dispatch(search(searchInput));
      }, 800);

      const t3 = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      timeouts.current.push(t2, t3);
    }, 600);

    timeouts.current.push(t1);
  };

  return (
    <>
      <div className={classes.ccRoot}>
        <div className={classes.ccWrapper}>
          <Button
            className={buttonClassname}
            style={{ marginBottom: "4px" }}
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            disabled={!chosenGarage || loading ? true : false}
            onClick={handleClick}
            fullWidth
          >
            {carsToMove.length > 1
              ? `Move ${carsToMove.length} cars`
              : `Move ${carsToMove.length} car`}
          </Button>
          {loading && <CircularProgress size={24} className={buttonProgress} />}
        </div>
      </div>
    </>
  );
};

export default MoveButton;
