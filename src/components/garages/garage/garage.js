import { CardContent, Grid, Paper, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { moveCar_checkChosenGarage } from "../../../actions/moveCar.js";
import {
  newCar_checkChosenGarage,
  newCar_checkChosenPossibleCar,
  newCar_setCarName,
  newCar_setPossibleCars,
} from "../../../actions/newCar.js";

const Garage = ({ garage, onClick, location }) => {
  const dispatch = useDispatch();

  const possibleCarInput = useSelector((state) => state.newCar.carName);
  const chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );

  const newCarChecks = (garage) => {
    if (possibleCarInput || chosenPossibleCar) {
      dispatch(newCar_setPossibleCars([]));
      dispatch(newCar_setCarName(""));
      dispatch(newCar_checkChosenPossibleCar(chosenPossibleCar));
    }
  };

  let color;
  let elevation;

  color = "#212121";
  elevation = 4;

  if (location === "chosenNewCarGarage") {
    elevation = 1;
    color = "#181818";
  }

  if (location === "moveCar") {
    elevation = 1;
    color = "#181818";
  }

  return (
    <div
      style={{ cursor: onClick ? "pointer" : null }}
      onClick={
        onClick
          ? (e) => {
              newCarChecks(garage);

              if (location === "chosenNewCarGarage" || location === "newCar") {
                return dispatch(newCar_checkChosenGarage(garage));
              }

              if (location === "moveCar") {
                return dispatch(moveCar_checkChosenGarage(garage));
              }
            }
          : null
      }
    >
      <Paper style={{ backgroundColor: color }} elevation={elevation}>
        <CardContent>
          <Grid container justifyContent="flex-start">
            <Typography
              style={{ color: "white", fontSize: "15px" }}
              variant="button"
            >
              {garage.name}
              {garage.desc.length ? ` - ${garage.desc} - ` : " - "}
              {garage.cars.length > 0
                ? garage.cars.length > 1
                  ? `${garage.cars.length} cars`
                  : `${garage.cars.length} car`
                : `${garage.cars.length} cars`}
            </Typography>
          </Grid>
        </CardContent>
      </Paper>
    </div>
  );
};

export default Garage;
