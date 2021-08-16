import React from "react";
import { Button } from "@material-ui/core/";

import { useSelector, useDispatch } from "react-redux";

import {
  createNewGarage,
  newGarage_setDesc,
  newGarage_setName,
} from "../../../actions/newGarage.js";

const CreateButton = () => {
  const dispatch = useDispatch();
  const newGaragename = useSelector((state) => state.newGarage.name);
  const newGarageDesc = useSelector((state) => state.newGarage.desc);

  const handleClick = (e) => {
    dispatch(newGarage_setDesc(""));
    dispatch(newGarage_setName(""));
    dispatch(createNewGarage(newGaragename, newGarageDesc));
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Create
    </Button>
  );
};

export default CreateButton;
