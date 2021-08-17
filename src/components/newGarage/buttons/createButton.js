import { useState } from "react";
import axios from "axios";

import clsx from "clsx";

import { useSelector, useDispatch } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core/";

import {
  newGarage_setDesc,
  newGarage_setName,
} from "../../../actions/newGarage.js";
import { useStyles } from "../../../styles/buttonStyles.js";

const config = require("../../../config.json");

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
      <div className={classes.ccRoot}>
        <div className={classes.ccWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={
              (!newGarageDesc && !newGaragename) || loading ? true : false
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
