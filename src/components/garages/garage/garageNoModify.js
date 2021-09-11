import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

import "../garageStyles.css";
import garageIcon from "../../../images/garage-icon.png";
import carIcon from "../../../images/car-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  newCar_checkChosenGarage,
  newCar_checkChosenPossibleCar,
  newCar_setCarName,
  newCar_setPossibleCars,
} from "../../../actions/newCar.js";
import {
  moveCar_checkChosenGarage,
  moveCar_searchGarages,
} from "../../../actions/moveCar.js";

const GarageNoModify = ({ garage, location }) => {
  const dispatch = useDispatch();

  const possibleCarInput = useSelector((state) => state.newCar.carName);
  const chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );
  const moveCarGarageInput = useSelector((state) => state.moveCar.garageInput);

  const handleClick = () => {
    if (possibleCarInput || chosenPossibleCar) {
      dispatch(newCar_setPossibleCars([]));
      dispatch(newCar_setCarName(""));
      dispatch(newCar_checkChosenPossibleCar(chosenPossibleCar));
    }

    if (location.includes("newcar")) {
      dispatch(newCar_checkChosenGarage(garage));
      return;
    }

    if (location.includes("movecar")) {
      dispatch(moveCar_checkChosenGarage(garage));
      dispatch(moveCar_searchGarages(moveCarGarageInput));
      return;
    }
  };

  let chosen = false;

  if (location.includes("chosen")) {
    chosen = true;
  }

  return (
    <Fade duration={500}>
      <motion.div
        className={`card card-clickable garage-card no-modify elevation1 uppercase ${
          chosen ? "card-chosen" : ""
        }`}
        onClick={handleClick}
      >
        <motion.div className="garage-card-left">
          <motion.div className="garage-card__info">
            <p className="text-primary">{garage.name}</p>
            <p className="text-secondary">
              {garage.desc.length && `${garage.desc}`}
            </p>
          </motion.div>
        </motion.div>

        <motion.div className="garage-card-right">
          <motion.div className="garage-card__icons">
            <p className="garage-card__car-count text-primary">
              {garage.cars.length}
            </p>

            <img
              className="garage-card__car-icon"
              src={carIcon}
              alt="car icon"
            />
            <img
              className="garage-card__garage-icon"
              src={garageIcon}
              alt="garage icon"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </Fade>
  );
};

export default GarageNoModify;
