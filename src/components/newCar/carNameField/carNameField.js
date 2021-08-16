import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  newCar_searchPossibleCars,
  newCar_setGarages,
  newCar_setCarName,
  newCar_setPossibleCars,
} from "../../../actions/newCar";

const CarNameField = () => {
  const newCarInput = useSelector((state) => state.newCar.carName);
  const dispatch = useDispatch();
  const possibleCars = useSelector((state) => state.newCar.possibleCars);

  const handleChange = (e) => {
    if (!e.target.value) {
      dispatch(newCar_setPossibleCars([]));
    }
    dispatch(newCar_setCarName(e.target.value));
    dispatch(newCar_searchPossibleCars(e.target.value));
    dispatch(newCar_setGarages([]));
  };

  const handleKeyPress = (e) => {
    if (!possibleCars.length) return;

    if (e.key === "Enter") {
      dispatch(newCar_setCarName(possibleCars[0].name));
      dispatch(newCar_setPossibleCars([]));
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
