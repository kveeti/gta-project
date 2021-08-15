import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import PossibleCar from "./possibleCar/possibleCar.js";

import {
  newCar_setCarName,
  newCar_setPossibleCars,
} from "../../actions/newCar.js";

const PossibleCars = () => {
  let possibleCars = useSelector((state) => state.newCar.possibleCars);

  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={1} justifyContent="center">
        {possibleCars.map((car, index) => {
          return (
            <Grid item key={car.name} xs={12}>
              <div
                key={index}
                style={{ cursor: "pointer" }}
                onClick={async (e) => {
                  await dispatch(newCar_setCarName(car.name));
                  dispatch(newCar_setPossibleCars([]));
                }}
              >
                <PossibleCar car={car} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PossibleCars;
