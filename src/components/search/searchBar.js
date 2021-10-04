import { useSelector, useDispatch } from "react-redux";
import { garageModify_setOpenGarage } from "../../actions/garageModify.js";

import { forceIsMoving } from "../../actions/moveCar.js";
import { newCar_setPossibleCars } from "../../actions/newCar.js";
import {
  search,
  search_setCars,
  search_setGarages,
  search_setInput,
} from "../../actions/search.js";
import { colors } from "../../styles/colors.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.search.input);
  const cars = useSelector((state) => state.search.cars);
  const garages = useSelector((state) => state.search.garages);

  const handleChange = (e) => {
    dispatch(search_setInput(e.target.value));
    dispatch(newCar_setPossibleCars([]));
    dispatch(forceIsMoving(false));
    dispatch(garageModify_setOpenGarage(null));

    if (!e.target.value) {
      dispatch(search_setGarages([]));
      return dispatch(search_setCars([]));
    }

    dispatch(search(e.target.value));
  };

  let color = colors.text.primary;

  if (searchInput.length && !cars.length && !garages.length) {
    setTimeout(() => {
      color = colors.red.primary;
    }, 50);
  }

  return (
    <input
      type="text"
      style={{
        backgroundColor: color,
        border: `4.75px solid ${color}`,
      }}
      className="search-bar"
      placeholder={"Search for cars/garages"}
      value={searchInput}
      onInput={handleChange}
      autoFocus
    ></input>
  );
};

export default SearchBar;
