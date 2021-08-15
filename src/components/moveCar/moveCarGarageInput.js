import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { newGarage_setName } from "../../../actions/newGarage";

const MoveCarGarageInput = () => {
  const dispatch = useDispatch();
  const newGarageName = useSelector((state) => state.newGarage);

  const handleChange = (e) => {
    dispatch(newGarage_setName(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Name"
      value={newGarageName}
      onChange={handleChange}
      style={{
        color: "white",
        backgroundColor: "#212121",
        fontSize: "18px",
      }}
    ></input>
  );
};

export default MoveCarGarageInput;
