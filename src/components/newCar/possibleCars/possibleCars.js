import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import PossibleCar from "./possibleCar/possibleCar.js";

import { newCar_checkChosenPossibleCar } from "../../../actions/newCar.js";

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
                  dispatch(newCar_checkChosenPossibleCar(car));
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
