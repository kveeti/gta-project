import { useSelector, useDispatch } from "react-redux";
import {
  newCar_checkChosenPossibleCar,
  newCar_searchPossibleCars,
  newCar_setCarName,
  newCar_setPossibleCars,
} from "../../../actions/newCar";
import { setNoResults } from "../../../actions/search.js";

const CarNameField = () => {
  const dispatch = useDispatch();

  const newCarInput = useSelector((state) => state.newCar.carName);
  const possibleCars = useSelector((state) => state.newCar.possibleCars);
  const chosenGarage = useSelector((state) => state.newCar.chosenGarage);

  const handleChange = (e) => {
    dispatch(newCar_setCarName(e.target.value));

    if (!e.target.value) {
      dispatch(newCar_setPossibleCars([]));
      dispatch(setNoResults(false));
    }

    dispatch(newCar_searchPossibleCars(e.target.value));
  };

  const handleKeyPress = (e) => {
    if (!possibleCars.length) return;

    if (e.key === "Enter") {
      dispatch(newCar_checkChosenPossibleCar(possibleCars[0]));
      dispatch(newCar_setPossibleCars([]));
    }
  };

  return (
    <input
      type="text"
      placeholder="Name"
      value={newCarInput}
      onInput={handleChange}
      onKeyPress={handleKeyPress}
      disabled={chosenGarage ? "" : "disabled"}
      style={{
        backgroundColor: "#212121",
        color: "white",
        fontSize: "18px",
        width: "100%",
      }}
    ></input>
  );
};

export default CarNameField;
