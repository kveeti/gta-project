import React from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  newCar_searchGarages,
  newCar_setGarageId,
  newCar_setGarageName,
  newCar_setGarages,
} from "../../actions/newCar.js";

const NewCarGarageInput = ({ paddingBottom = "0" }) => {
  const dispatch = useDispatch();

  const garageName = useSelector((state) => state.newCar.garageName);
  const garages = useSelector((state) => state.newCar.garages);

  const handleChange = (e) => {
    dispatch(newCar_setGarageName(e.target.value));

    if (!e.target.value) {
      dispatch(newCar_setGarages([]));
      return dispatch(newCar_setGarageId(null));
    }

    dispatch(newCar_searchGarages(e.target.value));
  };

  const handleKeyPress = (e) => {
    if (!garages.length) return;

    if (e.key === "Enter") {
      if (!garages[0]) return;

      dispatch(newCar_setGarageName(garages[0].name));
      dispatch(newCar_setGarageId(garages[0]._id));
      dispatch(newCar_setGarages([]));
    }
  };

  let color = "white";

  if (!garages.length) {
    color = "red";
  }

  return (
    <input
      type="text"
      id="select__garage"
      placeholder="Garage"
      value={garageName}
      onInput={handleChange}
      onKeyPress={handleKeyPress}
      style={{
        backgroundColor: "#212121",
        color: color,
        fontSize: "18px",
        paddingBottom: paddingBottom,
      }}
    ></input>
  );
};

export default NewCarGarageInput;
