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

import Car from "../cars/car/car.js";
import Garage from "../garages/garage/garage.js";

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

            {chosenGarage ? (
              <Garage
                garage={chosenGarage}
                location={"chosenNewCarGarage"}
                onClick={true}
              />
            ) : (
              <NewCarGarageInput />
            )}
            {chosenPossibleCar ? (
              <Car
                car={chosenPossibleCar}
                carType={"chosenPossibleCar"}
                onClick={true}
              />
            ) : (
              <CarNameField />
            )}
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
