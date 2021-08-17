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

import { search } from "../../../actions/search";

/* 
carType = "possibleCar":
  delete button is hidden
  garage is hidden
  class is shown

carType = "search":
  delete button is shown
  garage is shown
  class is hidden
*/

const Car = ({ car, carType }) => {
  const dispatch = useDispatch();
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);
  const isMoving = useSelector((state) => state.moveCar.isMoving);
  const errorCars = useSelector((state) => state.moveCar.errorCars);

  const searchInput = useSelector((state) => state.search.input);

  let color;

  if (carsToMove.filter((one) => one._id === car._id).length) {
    color = "#181818";
  } else {
    color = "#212121";
  }

  if (
    carType === "moveCar" &&
    errorCars.filter((one) => one._id.toString() === car._id.toString()).length
  ) {
    color = "#b02828";
  }

  return (
    <Paper style={{ backgroundColor: color }} elevation={5}>
      <CardContent>
        <Grid container direction="column" alignItems="flex-start">
          <Typography variant="button" style={{ color: "white" }}>
            {car.manufacturer} - {car.name}
          </Typography>

          {carType === "possibleCar" ? (
            <Typography variant="caption" style={{ color: "white" }}>
              {car.class}
            </Typography>
          ) : null}

          {carType === "search" ? (
            <Typography style={{ color: "grey", fontSize: "0.8rem" }}>
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
            color="secondary"
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
  );
};

export default Car;
