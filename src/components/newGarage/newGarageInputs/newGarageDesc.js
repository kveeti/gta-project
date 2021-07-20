import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setNewGarageDesc } from "../../../actions/garages";

const NewGarageDesc = () => {
  const dispatch = useDispatch();
  const newGarageDesc = useSelector((state) => state.newGarageDesc);

  const handleChange = (e) => {
    dispatch(setNewGarageDesc(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Description"
      value={newGarageDesc}
      onChange={handleChange}
      style={{
        color: "white",
        backgroundColor: "#212121",
        fontSize: "18px",
      }}
    ></input>
  );
};

export default NewGarageDesc;
