import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core/";

import Cars from "../cars/cars.js";

import SearchGarages from "../search/searchGarages/searchGarages.js";
import Search from "../search/index.js";

const Home = () => {
  const searchInput = useSelector((state) => state.search.input);

  const searchCars = useSelector((state) => state.search.cars);
  const searchGarages = useSelector((state) => state.search.garages);

  // this under the search
  // {/* shows move car page if there is cars to move */}
  // {carsToMove.length && isMoving ? (
  //   <>
  //     <Grid container justifyContent="center">
  //       <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
  //         <MoveCar />
  //       </Grid>
  //     </Grid>

  //     <Grid container justifyContent="center">
  //       <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
  //         {/* movecar garages goes here */}
  //       </Grid>
  //     </Grid>
  //   </>
  // ) : null}

  return (
    <>
      {/* search shows always */}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
          <Search />
        </Grid>
      </Grid>

      {searchInput.length && searchGarages.length ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
            <SearchGarages garages={searchGarages} />
          </Grid>
        </Grid>
      ) : null}

      {searchInput.length ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
            <Cars cars={searchCars} onClick={true} page={"home"} />
          </Grid>
        </Grid>
      ) : null}

      {/* shows cars which matches search or new car card and matching garages for new car card's garage search */}
      {/* {searchInput.length ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
            <Cars cars={matchingCars} onClick={true} page={"home"} />
          </Grid>
        </Grid>
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
        </>
      )}

      {newCarInput.length || garageInput.length ? null : (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
            <NewGarage />
          </Grid>
        </Grid>
      )} */}
    </>
  );
};

export default Home;
