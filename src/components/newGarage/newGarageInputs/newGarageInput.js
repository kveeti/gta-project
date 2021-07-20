import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setNewGarageName } from "../../../actions/garages";

const NewGarageName = () => {
  const dispatch = useDispatch();
  const newGarageName = useSelector((state) => state.newGarageName);

  const handleChange = (e) => {
    dispatch(setNewGarageName(e.target.value));
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

export default NewGarageName;
