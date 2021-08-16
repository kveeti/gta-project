import React from "react";

import { Button } from "@material-ui/core/";

import { useSelector, useDispatch } from "react-redux";

import { addCar } from "../../../actions/newCar";

const CreateButton = () => {
  const dispatch = useDispatch();

  const garage = useSelector((state) => state.newCar.chosenGarage);
  const possibleCar = useSelector((state) => state.newCar.chosenPossibleCar);

  const handleClick = (e) => {
    dispatch(addCar(possibleCar.name, garage._id));
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      disabled={!garage || !possibleCar ? true : false}
    >
      create
    </Button>
  );
};

export default CreateButton;
