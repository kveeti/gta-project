import { CardContent, Grid, Paper, Typography } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import {
  moveCar_checkChosenGarage,
  moveCar_searchGarages,
} from "../../../actions/moveCar.js";
import {
  newCar_checkChosenGarage,
  newCar_checkChosenPossibleCar,
  newCar_setCarName,
  newCar_setPossibleCars,
} from "../../../actions/newCar.js";

import { Fade } from "react-awesome-reveal";
import { colors } from "../../../styles/colors.js";
import { useCardStyles } from "../../../styles/cardStyles.js";

const Garage = ({ garage, location }) => {
  const dispatch = useDispatch();

  const cardClasses = useCardStyles();

  const possibleCarInput = useSelector((state) => state.newCar.carName);
  const chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );
  const moveCarGarageInput = useSelector((state) => state.moveCar.garageInput);

  const handleClick = () => {
    if (possibleCarInput || chosenPossibleCar) {
      dispatch(newCar_setPossibleCars([]));
      dispatch(newCar_setCarName(""));
      dispatch(newCar_checkChosenPossibleCar(chosenPossibleCar));
    }

    if (location === "chosenNewCarGarage" || location === "newCar") {
      dispatch(newCar_checkChosenGarage(garage));
      return;
    }

    if (location === "chosenMoveCarGarage" || location === "moveCar") {
      dispatch(moveCar_checkChosenGarage(garage));
      dispatch(moveCar_searchGarages(moveCarGarageInput));
      return;
    }
  };

  let elevation = 4;
  let cardClass = cardClasses.cards;

  if (location.includes("chosen")) {
    elevation = 1;
    cardClass = cardClasses.chosenCards;
  }

  return (
    <Fade duration={500}>
      <div style={{ cursor: "pointer" }} onClick={handleClick}>
        <Paper className={cardClass} elevation={elevation}>
          <CardContent>
            <Grid container justifyContent="flex-start">
              <Typography
                style={{ color: colors.text.primary, fontSize: "15px" }}
                variant="button"
              >
                {garage.name}
                {garage.desc.length ? ` - ${garage.desc} - ` : " - "}
                {garage.cars.length > 0
                  ? garage.cars.length > 1
                    ? `${garage.cars.length} cars`
                    : `${garage.cars.length} car`
                  : `${garage.cars.length} cars`}
              </Typography>
            </Grid>
          </CardContent>
        </Paper>
      </div>
    </Fade>
  );
};

export default Garage;
