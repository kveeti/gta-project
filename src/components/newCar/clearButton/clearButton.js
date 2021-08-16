import React from "react";
import { Button } from "@material-ui/core/";

import { useDispatch } from "react-redux";

import { newCar_clearAll } from "../../../actions/newCar";

const ClearButton = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(newCar_clearAll());
  };

  return (
    <Button color="secondary" onClick={handleClick}>
      Clear
    </Button>
  );
};

export default ClearButton;
