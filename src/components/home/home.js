import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core/";

import Cars from "../cars/cars.js";
import NewCar from "../newCar/newCar.js";
import Search from "../search/search.js";
import PossibleCars from "../possibleCars/possibleCars.js";

import MoveCar from "../moveCar/moveCar.js";
import Garages from "../garages/garages.js";

import NewGarage from "../newGarage/newGarage.js";

const Home = () => {
  const isMovingState = useSelector((state) => state.isMoving);
  const searchInputValue = useSelector((state) => state.searchInput);
  const matchingCars = useSelector((state) => state.matchingCars);
  const carsToMove = useSelector((state) => state.carsToMove);
  const matchingGarages = useSelector((state) => state.matchingGarages);
  const newCarInput = useSelector((state) => state.newCarInput);
  const garageInput = useSelector((state) => state.garageInput);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
          <Search />
        </Grid>
      </Grid>
      {carsToMove.length && isMovingState ? (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <MoveCar />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <Garages garages={matchingGarages} />
            </Grid>
          </Grid>
        </>
      ) : searchInputValue.length ? (
        searchInputValue.startsWith("g ") ? (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <Garages garages={matchingGarages} />
            </Grid>
          </Grid>
        ) : (
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <Cars cars={matchingCars} onClick={true} page={"home"} />
            </Grid>
          </Grid>
        )
      ) : (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <NewCar />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <Garages garages={matchingGarages} />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <PossibleCars />
            </Grid>
          </Grid>
          {newCarInput.length || garageInput.length ? null : (
            <>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
                  <NewGarage />
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
