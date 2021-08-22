import {
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Paper,
} from "@material-ui/core/";

import { Delete } from "@material-ui/icons/";

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

import { useBtnStyles } from "../../../styles/buttonStyles.js";
import { useCardStyles } from "../../../styles/cardStyles.js";
import { colors } from "../../../styles/colors.js";

const Car = ({ car, carType }) => {
  const dispatch = useDispatch();
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);
  const isMoving = useSelector((state) => state.moveCar.isMoving);
  const errorCars = useSelector((state) => state.moveCar.errorCars);

  const searchInput = useSelector((state) => state.search.input);

  const btnClasses = useBtnStyles();
  const cardClasses = useCardStyles();

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

  let elevation = 4;
  let cardClass = cardClasses.cards;

  if (carsToMove.filter((one) => one._id === car._id).length) {
    cardClass = cardClasses.chosenCards;
  }

  if (carType.includes("chosen")) {
    elevation = 1;
    cardClass = cardClasses.chosenCards;
  }

  if (
    carType === "chosenMoveCars" &&
    errorCars.filter((one) => one._id.toString() === car._id.toString()).length
  ) {
    cardClass = cardClasses.errorCards;
  }

  return (
    <Fade duration={500}>
      <div
        className={cardClass}
        style={{ cursor: "pointer" }}
        onClick={() => {
          checkMoveCar(car);

          checkPossibleCar(car);
        }}
      >
        <Paper className={cardClass} elevation={elevation}>
          <CardContent>
            <Grid container direction="column" alignItems="flex-start">
              {car.manufacturer ? (
                <Typography
                  variant="button"
                  style={{
                    color: colors.text.secondary,
                    marginBottom: "2px",
                    fontSize: "0.8em",
                  }}
                >
                  {car.manufacturer}
                </Typography>
              ) : null}

              <Typography
                variant="button"
                style={{ color: colors.text.primary }}
              >
                {car.name}
              </Typography>

              {carType === "possibleCar" ? (
                <Typography
                  variant="button"
                  style={{ color: colors.text.secondary, fontSize: "0.7em" }}
                >
                  {car.class}
                </Typography>
              ) : null}

              {carType === "search" || carType === "carsToMove" ? (
                <Typography
                  variant="button"
                  style={{
                    marginTop: "4px",
                    color: colors.text.secondary,
                    fontSize: "0.7em",
                  }}
                >
                  {car.garage.name}
                  {car.garage.desc.length ? ` - ${car.garage.desc}` : ""}
                </Typography>
              ) : null}
            </Grid>
          </CardContent>
          {isMoving || carType !== "search" ? null : (
            <CardActions>
              <IconButton
                aria-label="delete"
                className={btnClasses.deleteBtn}
                onClick={async (e) => {
                  e.stopPropagation();
                  await dispatch(deleteCar(car._id, searchInput));
                  dispatch(search(searchInput));
                }}
              >
                <Delete />
              </IconButton>
            </CardActions>
          )}
        </Paper>
      </div>
    </Fade>
  );
};

export default Car;
