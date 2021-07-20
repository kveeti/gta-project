import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import PossibleCar from "./possibleCar/possibleCar.js";

import { clearPossibleCars, setNewCarInput } from "../../actions/newCar.js";

const PossibleCars = () => {
  let matchingPossibleCars = useSelector((state) => state.matchingPossibleCars);
  const dispatch = useDispatch();

  return (
    <>
      {matchingPossibleCars === 204 ? (
        <></>
      ) : (
        <Grid container spacing={1} justifyContent="center">
          {matchingPossibleCars.map((car, index) => {
            return (
              <Grid item key={car.name} xs={12}>
                <div
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={async (e) => {
                    await dispatch(setNewCarInput(car.name));
                    dispatch(clearPossibleCars());
                  }}
                >
                  <PossibleCar car={car} />
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default PossibleCars;
