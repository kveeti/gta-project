import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  clearPossibleCars,
  setNewCarInput,
  searchPossibleCars,
} from "../../../actions/newCar";

import { clearGarages } from "../../../actions/garages.js";

const CarNameField = () => {
  const newCarInput = useSelector((state) => state.newCarInput);
  const dispatch = useDispatch();
  const possibleCars = useSelector((state) => state.matchingPossibleCars);

  const handleChange = (e) => {
    if (!e.target.value) {
      dispatch(clearPossibleCars());
    }
    dispatch(setNewCarInput(e.target.value));
    dispatch(searchPossibleCars(e.target.value));
    dispatch(clearGarages());
  };

  const handleKeyPress = (e) => {
    if (!possibleCars.length) return;

    if (e.key === "Enter") {
      dispatch(setNewCarInput(possibleCars[0].name));
      dispatch(clearPossibleCars());
    }
  };

  let color = "white";

  if (possibleCars === 204) {
    color = "red";
  }

  return (
    <input
      type="text"
      placeholder="Name"
      value={newCarInput}
      onInput={handleChange}
      onKeyPress={handleKeyPress}
      style={{
        backgroundColor: "#212121",
        color: color,
        fontSize: "18px",
      }}
    ></input>
  );
};

export default CarNameField;
