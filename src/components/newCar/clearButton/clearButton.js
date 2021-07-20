import React from "react";
import { Button } from "@material-ui/core/";

import { useDispatch } from "react-redux";

import { setNewCarInput } from "../../../actions/newCar";

import {
  setGarageInput,
  setNewGarageId,
  clearGarages,
} from "../../../actions/garages.js";

const ClearButton = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(setNewCarInput(""));
    dispatch(setGarageInput(""));
    dispatch(setNewGarageId(null));
    dispatch(clearGarages());
  };

  return (
    <Button color="secondary" onClick={handleClick}>
      Clear
    </Button>
  );
};

export default ClearButton;
