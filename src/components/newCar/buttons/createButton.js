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

  const garage = useSelector((state) => state.newCar.chosenGarage);
  const possibleCar = useSelector((state) => state.newCar.chosenPossibleCar);

  const handleClick = async (e) => {
    setLoading(true);
    await axios
      .post(`${config.API_URL}/gta-api/cars`, {
        name: possibleCar.name,
        garageID: garage._id,
      })
      .then((res) => {
        if (res.status === 201) {
          return setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            setTimeout(() => {
              dispatch(newCar_clearAll());
            }, 800);

            setTimeout(() => {
              setSuccess(false);
            }, 2000);
          }, 600);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setFailure(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }, 2500);

        setTimeout(() => {
          setFailure(false);
        }, 7000);
      });
  };

  return (
    <>
      <div className={classes.ccRoot}>
        <div className={classes.ccWrapper}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={buttonClassname}
            disabled={!garage || !possibleCar || loading ? true : false}
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
