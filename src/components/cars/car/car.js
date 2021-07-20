import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Button,
  Grid,
} from "@material-ui/core/";

import { Delete } from "@material-ui/icons/";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteCar } from "../../../actions/cars.js";

import { search } from "../../../actions/search";

import { getCarsForGarage } from "../../../actions/garages.js";

const Car = ({ car, page }) => {
  const dispatch = useDispatch();
  const carsToMove = useSelector((state) => state.carsToMove);
  const isMoving = useSelector((state) => state.isMoving);

  const searchInput = useSelector((state) => state.searchInput);

  let color;

  if (carsToMove.filter((one) => one.ID === car.ID).length) {
    color = "#181818";
  } else {
    color = "#212121";
  }

  return (
    <Card style={{ backgroundColor: color }} variant="outlined">
      <CardContent>
        <Grid container direction="column" alignItems="flex-start">
          <Typography
            variant="button"
            style={{ paddingLeft: "8px", color: "white" }}
          >
            {car.name}
          </Typography>

          <Button
            style={{ color: "grey", fontSize: "0.8rem" }}
            component={Link}
            to={`/garage/${car.garage.ID}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {car.garage.name}
            {car.garage.desc.length ? ` - ${car.garage.desc}` : ""}
          </Button>
        </Grid>
      </CardContent>
      {isMoving ? null : (
        <CardActions>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={async (e) => {
              e.stopPropagation();
              await dispatch(deleteCar(car.ID));
              if (page !== "garage_page") dispatch(search(searchInput));
              dispatch(getCarsForGarage(car.garage.ID));
            }}
          >
            <Delete />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default Car;
