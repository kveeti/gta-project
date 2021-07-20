import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Car from "./car/car";

import { checkCar, isMoving } from "../../actions/moveCar.js";

const Cars = ({ cars, onClick = false, page }) => {
  const dispatch = useDispatch();

  const carsToMove = useSelector((state) => state.carsToMove);
  const isMovingState = useSelector((state) => state.isMoving);

  return (
    <>
      {cars === 204 ? (
        <></>
      ) : (
        <Grid container spacing={1}>
          {cars.map((car) => {
            return (
              <Grid item key={car.ID} xs={12} sm={6} md={4} lg={4} xl={3}>
                <div
                  key={car.name}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (!onClick) return;
                    if (
                      page === "move_car" &&
                      carsToMove.length === 1 &&
                      isMovingState
                    ) {
                      dispatch(isMoving());
                    }
                    dispatch(checkCar(car));
                  }}
                >
                  <Car car={car} page={page} />
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Cars;
