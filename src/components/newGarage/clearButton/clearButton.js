import React from "react";
import { Button } from "@material-ui/core/";

import { useDispatch } from "react-redux";

import {
  setNewGarageDesc,
  setNewGarageName,
} from "../../../actions/garages.js";

const ClearButton = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(setNewGarageDesc(""));
    dispatch(setNewGarageName(""));
  };

  return (
    <Button color="secondary" onClick={handleClick}>
      Clear
    </Button>
  );
};

export default ClearButton;
