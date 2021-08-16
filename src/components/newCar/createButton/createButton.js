import React from "react";
import axios from "axios";

import { Button } from "@material-ui/core/";

import { useSelector, useDispatch } from "react-redux";

import { newCar_clearAll } from "../../../actions/newCar";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green, red } from "@material-ui/core/colors";

const config = require("../../../config.json");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
  },
  buttonFailure: {
    backgroundColor: red[500],
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const CreateButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonFailure]: failure,
  });

  const garage = useSelector((state) => state.newCar.chosenGarage);
  const possibleCar = useSelector((state) => state.newCar.chosenPossibleCar);

  const handleClick = async (e) => {
    setLoading(true);
    const res = await axios.post(`${config.API_URL}/gta-api/cars`, {
      name: possibleCar.name,
      garageID: garage._id,
    });

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

    setFailure(true);

    setTimeout(() => {
      setFailure(false);
    }, 3000);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={!garage || !possibleCar || loading ? true : false}
            onClick={handleClick}
          >
            Create
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateButton;
