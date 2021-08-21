import { useState } from "react";
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
    setLoading(true);
    await axios
      .put(`${config.API_URL}/gta-api/cars/`, {
        cars: carsToMove,
        newGarageID: chosenGarage._id,
      })
      .then((res) => {
        if (res.data.status === "none" && res.data.errorCars.length) {
          setFailure(true);

          setTimeout(() => {
            setLoading(false);
            for (const car of res.data.errorCars) {
              dispatch(moveCar_checkErrorCar(car));
            }

            setTimeout(() => {
              for (const car of res.data.errorCars) {
                dispatch(moveCar_checkErrorCar(car));
              }
              setFailure(false);
            }, 5000);
          }, 1000);

          return;
        }
        if (
          res.data.status === "some" &&
          res.data.errorCars.length &&
          res.data.movedCars.length
        ) {
          setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            dispatch(search(searchInput));

            setTimeout(() => {
              for (const movedCar of res.data.movedCars) {
                dispatch(moveCar_checkCar(movedCar));
              }

              setSuccess(false);
              setFailure(true);

              for (const errorCar of res.data.errorCars) {
                dispatch(moveCar_checkErrorCar(errorCar));
              }

              setTimeout(() => {
                setFailure(false);
                for (const errorCar of res.data.errorCars) {
                  dispatch(moveCar_checkErrorCar(errorCar));
                }
              }, 5000);
            }, 800);
          }, 600);

          return;
        }

        if (res.data.status === "every") {
          setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            setTimeout(() => {
              dispatch(moveCar_clear());
              if (!searchInput) return;
              dispatch(search(searchInput));
            }, 800);

            setTimeout(() => {
              setSuccess(false);
            }, 3000);
          }, 600);

          return;
        }
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setFailure(true);
          setTimeout(() => {
            setLoading(false);

            for (const car of carsToMove) {
              moveCar_checkErrorCar(car);
            }

            setTimeout(() => {
              setFailure(false);
              for (const car of carsToMove) {
                moveCar_checkErrorCar(car);
              }
            }, 7000);
          }, 2000);
        }, 2500);
      });
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
