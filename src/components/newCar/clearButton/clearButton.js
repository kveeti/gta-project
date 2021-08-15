import React from "react";
import { Button } from "@material-ui/core/";

import { useDispatch } from "react-redux";

import {
  newCar_setCarName,
  newCar_setGarageId,
  newCar_setGarageName,
  newCar_setGarages,
} from "../../../actions/newCar";

const ClearButton = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(newCar_setCarName(""));
    dispatch(newCar_setGarageName(""));
    dispatch(newCar_setGarageId(null));
    dispatch(newCar_setGarages([]));
  };

  return (
    <Button color="secondary" onClick={handleClick}>
      Clear
    </Button>
  );
};

export default ClearButton;
