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
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
            {/* search shows always */}

            <Search />

            {/* shows move car page if there is cars to move */}
            {moveCar_carsToMove.length && moveCar_isMoving ? <MoveCar /> : null}

            {!moveCar_chosenGarage ? (
              <MoveCarGarages garages={moveCar_garages} />
            ) : null}

            {searchInput.length && searchGarages.length && !moveCar_isMoving ? (
              <SearchGarages garages={searchGarages} />
            ) : null}

            {/* shows cars which matches search or new car card and matching garages for new car card's garage search */}
            {searchInput.length && !moveCar_isMoving ? (
              <Cars cars={searchCars} onClick={true} page={"home"} />
            ) : null}

            {!searchInput.length && !moveCar_isMoving ? <NewCar /> : null}

            {!newCar_chosenGarage && !searchInput.length ? (
              <NewCarGarages garages={newCarGarages} />
            ) : null}

            {!newCar_chosenPossibleCar ? <PossibleCars /> : null}

            {newCarNameInput.length ||
            newCarGarageInput.length ||
            searchInput.length ||
            moveCar_isMoving ? null : (
              <NewGarage />
            )}
          </Grid>
        </Grid>
      </FadeIn>
    </>
  );
};

export default Home;
