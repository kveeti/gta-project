import { useDispatch, useSelector } from "react-redux";

import { deleteCar } from "../../../actions/cars.js";
import {
  moveCar_checkCar,
  moveCar_checkErrorCar,
  moveCar_clear,
} from "../../../actions/moveCar.js";
import { newCar_checkChosenPossibleCar } from "../../../actions/newCar.js";

import { search } from "../../../actions/search.js";

import { Fade } from "react-awesome-reveal";

import carIcon from "../../../images/car-icon.png";

import "../carStyles.css";
import { Button } from "@material-ui/core";
import { useBtnStyles } from "../../../styles/buttonStyles.js";

const Car = ({ car, carType }) => {
  const dispatch = useDispatch();
  const btnClasses = useBtnStyles();

  const carsToMove = useSelector((state) => state.moveCar.carsToMove);
  const isMoving = useSelector((state) => state.moveCar.isMoving);
  const errorCars = useSelector((state) => state.moveCar.errorCars);
  const searchInput = useSelector((state) => state.search.input);

  let elevation = "4";
  let chosen = false;
  let error = false;
  let isPossibleCar = false;
  let isMoveCar = false;
  let isSearchCar = false;

  if (carType.includes("possiblecar")) {
    isPossibleCar = true;
  }

  if (carType.includes("movecar")) {
    isMoveCar = true;
  }

  if (carType === "search") {
    isSearchCar = true;
  }

  if (carsToMove.filter((one) => one._id === car._id).length) {
    chosen = true;
  }

  if (carType.includes("chosen")) {
    chosen = true;
    elevation = "0";
  }

  if (
    isMoveCar &&
    errorCars.filter((one) => one._id.toString() === car._id.toString()).length
  ) {
    error = true;
  }

  const handleDelete = async (e) => {
    e.stopPropagation();
    await dispatch(deleteCar(car._id, searchInput));
    dispatch(search(searchInput));
  };

  const handleClick = () => {
    if (isSearchCar) {
      dispatch(moveCar_checkCar(car));
      return;
    }

    if (isPossibleCar) {
      dispatch(newCar_checkChosenPossibleCar(car));
      return;
    }

    checkMoveCar(car);
  };

  const checkMoveCar = (car) => {
    if (!isMoveCar) return;

    if (carsToMove.length === 1 && isMoving) {
      return dispatch(moveCar_clear());
    }

    const errorCar = errorCars.find((errorCar) => (errorCar._id = car._id));

    if (errorCar) {
      dispatch(moveCar_checkErrorCar(errorCar));
    }

    dispatch(moveCar_checkCar(car));
  };

  return (
    <Fade duration={500}>
      <div
        className={`card card-clickable car-card uppercase elevation${elevation} ${
          error ? "card-error" : ""
        } ${chosen ? "card-chosen" : ""}`}
        onClick={handleClick}
      >
        <div className="car-info">
          <p className="text-secondary">
            {car.manufacturer ? car.manufacturer : "unknown"}
          </p>
          <p className="text-primary">{car.name}</p>

          {isPossibleCar ? (
            <p className="text-secondary">{car.class}</p>
          ) : (
            <p className="text-secondary">
              {car.garage.name}
              {car.garage.desc ? ` - ${car.garage.desc}` : null}
            </p>
          )}
        </div>
        <div className="car-card__rigth">
          <img className="car-card__car-icon" src={carIcon} alt="car icon" />

          {isSearchCar ? (
            <Button
              className={btnClasses.deleteBtn2}
              size="small"
              onClick={handleDelete}
            >
              delete
            </Button>
          ) : null}
        </div>
      </div>
    </Fade>
  );
};

export default Car;
