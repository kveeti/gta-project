import { useSelector } from "react-redux";
import { createTheme, Grid, ThemeProvider } from "@material-ui/core/";

import Search from "../search/index.js";

import NewCar from "../newCar/newCar.js";
import NewGarage from "../newGarage/newGarage.js";

import Cars from "../cars/cars.js";
import Garages from "../garages/garages.js";
import GaragesNoModify from "../garages/garagesNoModify.js";

import MoveCar from "../moveCar/moveCar.js";

import Info from "./info.js";
import NoResults from "./noResults.js";

import LogoutButton from "../search/buttons/logoutButton.js";

import { delays } from "../../styles/delays.js";
import FadeIn from "react-fade-in";

const Home = () => {
  const searchInput = useSelector((state) => state.search.input);
  const searchCars = useSelector((state) => state.search.cars);
  const searchGarages = useSelector((state) => state.search.garages);

  const noResults = useSelector((state) => state.search.noResults);

  const newCar_garages = useSelector((state) => state.newCar.garages);
  const newCar_possibleCars = useSelector((state) => state.newCar.possibleCars);
  const newCar_carInput = useSelector((state) => state.newCar.carName);
  const newCar_garageInput = useSelector((state) => state.newCar.garageName);
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
  const moveCar_garageInput = useSelector((state) => state.moveCar.garageInput);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 500,
        sm: 800,
        md: 1600,
        lg: 2600,
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            {/* search shows always */}
            <FadeIn transitionDuration={delays.fadeIn}>
              <Search />
            </FadeIn>

            {moveCar_carsToMove.length && moveCar_isMoving ? <MoveCar /> : null}

            {!moveCar_chosenGarage && moveCar_isMoving ? (
              <GaragesNoModify garages={moveCar_garages} location={"movecar"} />
            ) : null}

            {searchInput.length && searchGarages.length && !moveCar_isMoving ? (
              <Garages garages={searchGarages} location={"search"} />
            ) : null}

            {/* shows cars which matches search or new car card and matching garages for new car card's garage search */}
            {searchInput.length && !moveCar_isMoving ? (
              <Cars cars={searchCars} onClick={true} carType={"search"} />
            ) : null}

            {!searchInput.length && !moveCar_isMoving ? (
              <FadeIn transitionDuration={delays.fadeIn}>
                <NewCar />
              </FadeIn>
            ) : null}

            {!newCar_chosenGarage &&
            !searchInput.length &&
            newCar_garageInput.length &&
            !noResults ? (
              <GaragesNoModify garages={newCar_garages} location={"newcar"} />
            ) : null}

            {!newCar_chosenPossibleCar && newCar_carInput.length ? (
              <>
                {newCar_possibleCars.length ? (
                  <Info msg={"Select a car"} />
                ) : null}

                <Cars
                  cars={newCar_possibleCars}
                  onClick={true}
                  carType={"possiblecar"}
                />
              </>
            ) : null}

            {newCar_carInput.length ||
            newCar_garageInput.length ||
            searchInput.length ||
            moveCar_isMoving ? null : (
              <FadeIn transitionDuration={delays.fadeIn}>
                <NewGarage />
              </FadeIn>
            )}

            {((searchInput.length &&
              !searchCars.length &&
              !searchGarages.length) ||
              (newCar_carInput.length &&
                !newCar_possibleCars.length &&
                !newCar_chosenPossibleCar) ||
              (newCar_garageInput.length &&
                !newCar_garages.length &&
                !newCar_chosenGarage) ||
              (moveCar_garageInput.length &&
                !moveCar_garages.length &&
                !moveCar_chosenGarage)) &&
            noResults ? (
              <NoResults />
            ) : null}

            {newCar_carInput.length ||
            newCar_garageInput ||
            newCar_possibleCars.length ||
            searchInput.length ||
            moveCar_isMoving ? null : (
              <FadeIn transitionDuration={delays.fadeIn}>
                <LogoutButton />
              </FadeIn>
            )}
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Home;
