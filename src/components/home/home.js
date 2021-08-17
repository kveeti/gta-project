import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core/";
import FadeIn from "react-fade-in";

import Cars from "../cars/cars.js";

import Search from "../search/index.js";
import NewCar from "../newCar/newCar.js";

import NewGarage from "../newGarage/newGarage.js";
import MoveCar from "../moveCar/moveCar.js";

import Garages from "../garages/garages.js";

const Home = () => {
  const searchInput = useSelector((state) => state.search.input);
  const searchCars = useSelector((state) => state.search.cars);
  const searchGarages = useSelector((state) => state.search.garages);

  const newCar_Garages = useSelector((state) => state.newCar.garages);
  const newCar_PossibleCars = useSelector((state) => state.newCar.possibleCars);
  const newCar_NameInput = useSelector((state) => state.newCar.carName);
  const newCar_GarageInput = useSelector((state) => state.newCar.garageName);
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
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
            {/* search shows always */}
            <Search />

            {/* shows move car page if there is cars to move */}
            {moveCar_carsToMove.length && moveCar_isMoving ? <MoveCar /> : null}

            {!moveCar_chosenGarage ? (
              <Garages
                garages={moveCar_garages}
                onClick={true}
                location={"moveCar"}
              />
            ) : null}

            {searchInput.length && searchGarages.length && !moveCar_isMoving ? (
              <Garages garages={searchGarages} location={"search"} />
            ) : null}

            {/* shows cars which matches search or new car card and matching garages for new car card's garage search */}
            {searchInput.length && !moveCar_isMoving ? (
              <Cars cars={searchCars} onClick={true} carType={"search"} />
            ) : null}

            {!searchInput.length && !moveCar_isMoving ? <NewCar /> : null}

            {!newCar_chosenGarage && !searchInput.length ? (
              <Garages
                garages={newCar_Garages}
                onClick={true}
                location={"newCar"}
              />
            ) : null}

            {!newCar_chosenPossibleCar ? (
              <Cars
                cars={newCar_PossibleCars}
                onClick={true}
                carType={"possibleCar"}
              />
            ) : null}

            {newCar_NameInput.length ||
            newCar_GarageInput.length ||
            searchInput.length ||
            moveCar_isMoving ? null : (
              <NewGarage />
            )}

            {/* <Fab
              style={{
                margin: 0,
                top: "auto",
                right: 20,
                bottom: 20,
                left: "auto",
                position: "fixed",
              }}
            ></Fab> */}
          </Grid>
        </Grid>
      </FadeIn>
    </>
  );
};

export default Home;
