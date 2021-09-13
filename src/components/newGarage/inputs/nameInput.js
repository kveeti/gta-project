import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { newGarage_setName } from "../../../actions/newGarage";

const NameInput = () => {
  const dispatch = useDispatch();
  const newGarageName = useSelector((state) => state.newGarage.name);

  const handleChange = (e) => {
    dispatch(newGarage_setName(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Name"
      value={newGarageName}
      onChange={handleChange}
    ></input>
  );
};

export default NameInput;
