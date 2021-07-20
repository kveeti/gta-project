import React from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  setGarageInput,
  clearGarages,
  searchGarages,
  setNewGarageId,
} from "../../actions/garages.js";

const SelectGarage = ({ paddingBottom = "0" }) => {
  const dispatch = useDispatch();
  const garageInput = useSelector((state) => state.garageInput);
  const garages = useSelector((state) => state.matchingGarages);

  const handleChange = (e) => {
    dispatch(setGarageInput(e.target.value));

    if (!e.target.value) {
      dispatch(clearGarages());
      return dispatch(setNewGarageId(null));
    }

    dispatch(searchGarages(e.target.value));
  };

  const handleKeyPress = (e) => {
    if (!garages.length) return;

    if (e.key === "Enter") {
      if (!garages[0]) return;

      dispatch(setGarageInput(garages[0].name));
      dispatch(setNewGarageId(garages[0].ID));
      dispatch(clearGarages());
    }
  };

  let color = "white";

  if (garages === 204) {
    color = "red";
  }

  return (
    <input
      type="text"
      id="select__garage"
      placeholder="Garage"
      value={garageInput}
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

export default SelectGarage;
