import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { newGarage_setDesc } from "../../../actions/newGarage";

const NewGarageDesc = () => {
  const dispatch = useDispatch();
  const newGarageDesc = useSelector((state) => state.newGarageDesc);

  const handleChange = (e) => {
    dispatch(newGarage_setDesc(e.target.value));
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
