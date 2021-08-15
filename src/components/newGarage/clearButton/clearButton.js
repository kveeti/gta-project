import React from "react";
import { Button } from "@material-ui/core/";

import { useDispatch } from "react-redux";
import {
  newGarage_setDesc,
  newGarage_setName,
} from "../../../actions/newGarage";

const ClearButton = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(newGarage_setDesc(""));
    dispatch(newGarage_setName(""));
  };

  return (
    <Button color="secondary" onClick={handleClick}>
      Clear
    </Button>
  );
};

export default ClearButton;
