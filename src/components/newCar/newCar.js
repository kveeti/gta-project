import { useSelector } from "react-redux";

import {
  CardActions,
  CardContent,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core/";

import CreateButton from "./buttons/createButton";
import ClearButton from "./buttons/clearButton";

import CarNameField from "./carNameField/carNameField";
import NewCarGarageInput from "./newCarGarageInput";

import NewCarChosenGarage from "./newCarChosenGarage/newCarChosenGarage";
import NewCarChosenPossibleCar from "./newCarChosenPossibleCar/newCarChosenPossibleCar";

const NewCar = () => {
  const chosenGarage = useSelector((state) => state.newCar.chosenGarage);
  const chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );

  return (
    <>
      <Paper
        style={{ backgroundColor: "#212121", marginTop: "8px" }}
        elevation={6}
      >
        <CardContent>
          <Grid container direction="column" style={{ rowGap: "10px" }}>
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
          <Grid container justifyContent="center">
            <ClearButton />
            <CreateButton />
          </Grid>
        </CardActions>
      </Paper>
    </>
  );
};

export default NewCar;
