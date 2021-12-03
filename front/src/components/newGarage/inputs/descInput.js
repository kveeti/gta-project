import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { newGarage_setDesc } from "../../../actions/newGarage";

const DescInput = () => {
  const dispatch = useDispatch();
  const newGarageDesc = useSelector((state) => state.newGarage.desc);

  const handleChange = (e) => {
    dispatch(newGarage_setDesc(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Description"
      value={newGarageDesc}
      onChange={handleChange}
    ></input>
  );
};

export default DescInput;
