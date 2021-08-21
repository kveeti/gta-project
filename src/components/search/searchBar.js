import { useSelector, useDispatch } from "react-redux";

import { forceIsMoving } from "../../actions/moveCar.js";
import { newCar_setPossibleCars } from "../../actions/newCar.js";
import {
  search,
  search_setCars,
  search_setGarages,
  search_setInput,
} from "../../actions/search.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.search.input);
  const cars = useSelector((state) => state.search.cars);
  const garages = useSelector((state) => state.search.garages);

  const handleChange = (e) => {
    dispatch(search_setInput(e.target.value));
    dispatch(newCar_setPossibleCars([]));
    dispatch(forceIsMoving(false));

    if (!e.target.value) {
      dispatch(search_setGarages([]));
      return dispatch(search_setCars([]));
    }

    dispatch(search(e.target.value));
  };

  let color = "white";

  if (searchInput.length && !cars.length && !garages.length) {
    color = "red";
  }

  return (
    <input
      type="text"
      style={{
        width: "100%",
        backgroundColor: color,
        border: `4.75px solid ${color}`,
        borderRadius: "2.5px",
        fontSize: "16px",
      }}
      value={searchInput}
      onInput={handleChange}
      autoFocus
    ></input>
  );
};

export default SearchBar;
