import { useSelector, useDispatch } from "react-redux";

import {
  newCar_checkChosenGarage,
  newCar_searchGarages,
  newCar_setGarageName,
  newCar_setGarages,
} from "../../../actions/newCar.js";

const GarageInput = ({ paddingBottom = "0" }) => {
  const dispatch = useDispatch();

  const garageName = useSelector((state) => state.newCar.garageName);
  const garages = useSelector((state) => state.newCar.garages);

  const handleChange = (e) => {
    dispatch(newCar_setGarageName(e.target.value));

    if (!e.target.value) {
      return dispatch(newCar_setGarages([]));
    }

    dispatch(newCar_searchGarages(e.target.value));
  };

  const handleKeyPress = (e) => {
    if (!garages.length) return;

    if (e.key === "Enter") {
      if (!garages[0]) return;

      dispatch(newCar_checkChosenGarage(garages[0]));
    }
  };

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
        color: "white",
        fontSize: "18px",
        paddingBottom: paddingBottom,
        width: "100%",
      }}
    ></input>
  );
};

export default GarageInput;
