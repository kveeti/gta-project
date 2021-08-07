import React from "react";
import { Button } from "@material-ui/core/";

import { useSelector, useDispatch } from "react-redux";

import {
  addCar,
  setNewCarInput,
  clearPossibleCars,
} from "../../../actions/newCar";

import { setGarageInput, setNewGarageId } from "../../../actions/garages.js";

const CreateButton = () => {
  const dispatch = useDispatch();

  const newCarName = useSelector((state) => state.newCarInput);
  const newGarageId = useSelector((state) => state.newGarageId);

  const handleClick = (e) => {
    dispatch(addCar(newCarName, newGarageId));
    dispatch(setNewCarInput(""));
    dispatch(setGarageInput(""));
    dispatch(clearPossibleCars());
    dispatch(setNewGarageId(null));
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      create
    </Button>
  );
};

export default CreateButton;
