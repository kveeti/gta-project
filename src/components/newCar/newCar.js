import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core/";

import CreateButton from "./createButton/createButton.js";
import ClearButton from "./clearButton/clearButton.js";

import CarNameField from "./carNameField/carNameField.js";
import NewCarGarageInput from "./newCarGarageInput.js";
import { useSelector } from "react-redux";
import NewCarChosenGarage from "./newCarChosenGarage/newCarChosenGarage.js";
import NewCarChosenPossibleCar from "./newCarChosenPossibleCar/newCarChosenPossibleCar.js";

const NewCar = () => {
  const chosenGarage = useSelector((state) => state.newCar.chosenGarage);
  const chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );

  return (
    <>
      <Card
        style={{ backgroundColor: "#212121", marginBottom: "9.5px" }}
        variant="outlined"
      >
        <CardContent>
          <Grid container direction="column" style={{ gridRowGap: "10px" }}>
            <Typography
              variant="button"
              style={{ color: "white", fontSize: "18px" }}
            >
              New car
            </Typography>

            {chosenGarage ? <NewCarChosenGarage /> : <NewCarGarageInput />}
            {chosenPossibleCar ? <NewCarChosenPossibleCar /> : <CarNameField />}
          </Grid>
        </CardContent>

        <CardActions>
          <Grid
            container
            justifyContent="center"
            style={{ gridColumnGap: "10px" }}
          >
            <ClearButton />
            <CreateButton />
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default NewCar;
