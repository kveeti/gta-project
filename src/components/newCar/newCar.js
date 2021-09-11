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
import CarInput from "./inputs/carInput";
import GarageInput from "./inputs/garageInput";
import Car from "../cars/car/car";
import GarageNoModify from "../garages/garage/garageNoModify.js";

import { Fade } from "react-awesome-reveal";

const NewCar = () => {
  const chosenGarage = useSelector((state) => state.newCar.chosenGarage);
  const chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );

  return (
    <>
      <Paper
        style={{
          backgroundColor: "#212121",
          marginTop: "8px",
        }}
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
              <GarageNoModify garage={chosenGarage} location="chosen-newcar" />
            ) : (
              <Fade>
                <GarageInput />
              </Fade>
            )}

            {chosenPossibleCar ? (
              <Car
                car={chosenPossibleCar}
                carType={"chosen-possiblecar"}
                onClick={true}
              />
            ) : (
              <Fade>
                <CarInput />
              </Fade>
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
