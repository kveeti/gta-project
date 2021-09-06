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

const Car = ({ car, carType }) => {
  const dispatch = useDispatch();
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);
  const isMoving = useSelector((state) => state.moveCar.isMoving);
  const errorCars = useSelector((state) => state.moveCar.errorCars);

  const searchInput = useSelector((state) => state.search.input);

  const handleDelete = async (e) => {
    e.stopPropagation();
    await dispatch(deleteCar(car._id, searchInput));
    dispatch(search(searchInput));
  };

  const handleCarClick = (e) => {
    checkMoveCar(car);

    checkPossibleCar(car);
  };

  const checkMoveCar = (car) => {
    if (
      carType !== "moveCar" &&
      carType !== "search" &&
      carType !== "chosenMoveCars"
    )
      return;

    if (carsToMove.length === 1 && isMoving) {
      return dispatch(moveCar_clear());
    }

    const errorCar = errorCars.find((errorCar) => (errorCar._id = car._id));

    if (errorCar) {
      dispatch(moveCar_checkErrorCar(errorCar));
    }

    dispatch(moveCar_checkCar(car));
  };

  const checkPossibleCar = (car) => {
    if (carType !== "possibleCar" && carType !== "chosenPossibleCar") return;

    dispatch(newCar_checkChosenPossibleCar(car));
  };

  let elevation = "4";
  let chosen = false;
  let error = false;

  if (carsToMove.filter((one) => one._id === car._id).length) {
    chosen = true;
  }

  if (carType.includes("chosen")) {
    chosen = true;
    elevation = "0";
  }

  if (
    carType === "chosenMoveCars" &&
    errorCars.filter((one) => one._id.toString() === car._id.toString()).length
  ) {
    error = true;
  }

  return (
    <Fade duration={500}>
      <div
        className={`card car-card card-clickable elevation${elevation} ${
          chosen ? "card-chosen" : ""
        } ${error ? "card-error" : ""}`}
        onClick={handleCarClick}
      >
        <div className="car-info uppercase">
          <p className="car-info__manufacturer">
            {car.manufacturer ? car.manufacturer : "unknown"}
          </p>
          <p className="car-info__name">{car.name}</p>

          {carType === "possibleCar" || carType === "chosenPossibleCar" ? (
            <p className="car-info__car-class">{car.class}</p>
          ) : (
            <p className="car-info__garage">
              {car.garage.name}
              {car.garage.desc ? ` - ${car.garage.desc}` : null}
            </p>
          )}
        </div>
        <div className="car-card__rigth-wrapper">
          <img className="car-card__car-icon" src={carIcon} alt="car icon" />

          {carType === "search" ? (
            <button
              className="car-card__delete-btn uppercase"
              onClick={handleDelete}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </Fade>
  );
};

export default Car;
