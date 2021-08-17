import { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core/";

import { useSelector, useDispatch } from "react-redux";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green, red } from "@material-ui/core/colors";

import {
  newGarage_setDesc,
  newGarage_setName,
} from "../../../actions/newGarage.js";

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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const newGaragename = useSelector((state) => state.newGarage.name);
  const newGarageDesc = useSelector((state) => state.newGarage.desc);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonFailure]: failure,
  });

  const handleClick = async (e) => {
    setLoading(true);

    const res = await axios.post(`${config.API_URL}/gta-api/garages`, {
      name: newGaragename,
      desc: newGarageDesc,
    });

    if (res.status === 201) {
      return setTimeout(() => {
        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
          dispatch(newGarage_setName(""));
          dispatch(newGarage_setDesc(""));
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
            disabled={
              !newGarageDesc || !newGaragename || loading ? true : false
            }
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
