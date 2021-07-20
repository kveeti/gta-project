import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { forceIsMoving } from "../../../actions/moveCar.js";
import { clearPossibleCars } from "../../../actions/newCar.js";
import { setSearchInput, search, clearCars } from "../../../actions/search.js";
import { clearGarages } from "../../../actions/garages.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.searchInput);

  const badSearch = useSelector((state) => state.badSearch);

  const handleChange = (e) => {
    dispatch(setSearchInput(e.target.value));
    dispatch(clearPossibleCars());
    dispatch(forceIsMoving(false));

    if (!e.target.value) {
      dispatch(clearCars());
      return dispatch(clearGarages());
    }

    dispatch(search(e.target.value));
  };

  let color = "white";

  if (badSearch && searchInput.length) {
    color = "red";
  }

  return (
    <input
      type="text"
      style={{
        width: "100%",
        backgroundColor: color,
        border: `2px solid ${color}`,
        fontSize: "1rem",
      }}
      value={searchInput}
      onInput={handleChange}
      autoFocus
    ></input>
  );
};

export default SearchBar;
