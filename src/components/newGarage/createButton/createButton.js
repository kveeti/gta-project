import React from "react";
import { Button } from "@material-ui/core/";

import { useSelector, useDispatch } from "react-redux";

import {
  createNewGarage,
  setNewGarageDesc,
  setNewGarageName,
} from "../../../actions/garages.js";

const CreateButton = () => {
  const dispatch = useDispatch();
  const newGaragename = useSelector((state) => state.newGarageName);
  const newGarageDesc = useSelector((state) => state.newGarageDesc);

  const handleClick = (e) => {
    dispatch(setNewGarageDesc(""));
    dispatch(setNewGarageName(""));
    dispatch(createNewGarage(newGaragename, newGarageDesc));
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Create
    </Button>
  );
};

export default CreateButton;
