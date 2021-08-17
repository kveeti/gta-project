import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core/";
import FadeIn from "react-fade-in";

import Cars from "../cars/cars.js";

import SearchGarages from "../search/searchGarages/searchGarages.js";
import Search from "../search/index.js";
import NewCar from "../newCar/newCar.js";
import NewCarGarages from "../newCar/newCarGarages.js/newCarGarages.js";
import PossibleCars from "../newCar/possibleCars/possibleCars.js";
import NewGarage from "../newGarage/newGarage.js";
import MoveCar from "../moveCar/moveCar.js";
import MoveCarGarages from "../moveCar/moveCarGarages/moveCarGarages.js";

const Home = () => {
  const searchInput = useSelector((state) => state.search.input);
  const searchCars = useSelector((state) => state.search.cars);
  const searchGarages = useSelector((state) => state.search.garages);

  const newCarGarages = useSelector((state) => state.newCar.garages);
  const newCarNameInput = useSelector((state) => state.newCar.carName);
  const newCarGarageInput = useSelector((state) => state.newCar.garageName);
  const newCar_chosenGarage = useSelector((state) => state.newCar.chosenGarage);
  const newCar_chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );

  const moveCar_carsToMove = useSelector((state) => state.moveCar.carsToMove);
  const moveCar_isMoving = useSelector((state) => state.moveCar.isMoving);
  const moveCar_garages = useSelector((state) => state.moveCar.garages);
  const moveCar_chosenGarage = useSelector(
    (state) => state.moveCar.chosenGarage
  );

  return (
    <>
      <FadeIn>
        {/* search shows always */}
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
            <Search />
          </Grid>
        </Grid>

        {/* shows move car page if there is cars to move */}
        {moveCar_carsToMove.length && moveCar_isMoving ? (
          <>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
                <MoveCar />
              </Grid>
            </Grid>
          </>
        ) : null}

        {!moveCar_chosenGarage ? (
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <MoveCarGarages garages={moveCar_garages} />
            </Grid>
          </Grid>
        ) : null}

        {searchInput.length && searchGarages.length && !moveCar_isMoving ? (
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <SearchGarages garages={searchGarages} />
            </Grid>
          </Grid>
        ) : null}

        {/* shows cars which matches search or new car card and matching garages for new car card's garage search */}
        {searchInput.length && !moveCar_isMoving ? (
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <Cars cars={searchCars} onClick={true} page={"home"} />
            </Grid>
          </Grid>
        ) : null}

        {!searchInput.length && !moveCar_isMoving ? (
          <>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
                <NewCar />
              </Grid>
            </Grid>
          </>
        ) : null}

        {!newCar_chosenGarage ? (
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <NewCarGarages garages={newCarGarages} />
            </Grid>
          </Grid>
        ) : null}

        {!newCar_chosenPossibleCar ? (
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <PossibleCars />
            </Grid>
          </Grid>
        ) : null}

        {newCarNameInput.length ||
        newCarGarageInput.length ||
        searchInput.length ||
        moveCar_isMoving ? null : (
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <NewGarage />
            </Grid>
          </Grid>
        )}
      </FadeIn>
    </>
  );
};

export default Home;
