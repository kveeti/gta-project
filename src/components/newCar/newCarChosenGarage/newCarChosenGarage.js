import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  newCar_checkChosenGarage,
  newCar_checkChosenPossibleCar,
  newCar_searchGarages,
  newCar_setCarName,
  newCar_setPossibleCars,
} from "../../../actions/newCar";

const NewCarChosenGarage = () => {
  const dispatch = useDispatch();

  const chosenGarage = useSelector((state) => state.newCar.chosenGarage);
  const chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );

  return (
    <>
      {chosenGarage ? (
        <div
          onClick={(e) => {
            if (chosenPossibleCar) {
              dispatch(newCar_checkChosenPossibleCar(chosenPossibleCar));
              dispatch(newCar_setCarName(""));
              dispatch(newCar_setPossibleCars([]));
            }
            dispatch(newCar_checkChosenGarage(chosenGarage));
          }}
          style={{ cursor: "pointer" }}
        >
          <Card style={{ backgroundColor: "#181818" }} variant="outlined">
            <CardContent>
              <Grid container justifyContent="flex-start">
                <Typography
                  style={{ color: "white", fontSize: "15px" }}
                  variant="button"
                >
                  {chosenGarage.name}
                  {chosenGarage.desc.length
                    ? ` - ${chosenGarage.desc} - `
                    : " - "}
                  {chosenGarage.cars.length > 0
                    ? chosenGarage.cars.length > 1
                      ? `${chosenGarage.cars.length} cars`
                      : `${chosenGarage.cars.length} car`
                    : `${chosenGarage.cars.length} cars`}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default NewCarChosenGarage;
