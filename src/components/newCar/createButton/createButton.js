import React from "react";
import { Button } from "@material-ui/core/";

import { useSelector, useDispatch } from "react-redux";

import {
  addCar,
  newCar_setCarName,
  newCar_setGarageId,
  newCar_setGarageName,
  newCar_setPossibleCars,
} from "../../../actions/newCar";

const CreateButton = () => {
  const dispatch = useDispatch();

  const newCarName = useSelector((state) => state.newCar.carName);
  const newGarageId = useSelector((state) => state.newCar.garageId);

  const handleClick = (e) => {
    dispatch(addCar(newCarName, newGarageId));
    dispatch(newCar_setCarName(""));
    dispatch(newCar_setGarageName(""));
    dispatch(newCar_setPossibleCars([]));
    dispatch(newCar_setGarageId(null));
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      create
    </Button>
  );
};

export default CreateButton;
