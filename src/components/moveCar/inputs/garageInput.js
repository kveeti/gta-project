import { useSelector, useDispatch } from "react-redux";

import {
  moveCar_searchGarages,
  moveCar_setGarageInput,
  moveCar_setGarages,
} from "../../../actions/moveCar";

const GarageInput = () => {
  const dispatch = useDispatch();
  const newGarageName = useSelector((state) => state.moveCar.garageInput);

  const handleChange = (e) => {
    dispatch(moveCar_setGarageInput(e.target.value));

    if (!e.target.value) {
      dispatch(moveCar_setGarages([]));
    }

    dispatch(moveCar_searchGarages(e.target.value));
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

export default GarageInput;
