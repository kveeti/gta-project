import { CardContent, Typography, Grid, Paper } from "@material-ui/core";

import { useSelector } from "react-redux";

import Cars from "../cars/cars.js";

import MoveCarGarageInput from "./moveCarGarageInput";
import MoveCarChosenGarage from "./moveCarChosenGarage/moveCarChosenGarage";
import MoveButton from "./buttons/moveButton";
import ClearButton from "./buttons/clearButton";

const MoveCar = () => {
  const chosenGarage = useSelector((state) => state.moveCar.chosenGarage);
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);

  return (
    <>
      <Paper
        style={{ backgroundColor: "#212121", marginBottom: "7.5px" }}
        elevation={6}
      >
        <CardContent>
          <Grid container direction="column" style={{ gridRowGap: "10px" }}>
            <Typography
              variant="body1"
              style={{
                color: "white",
                paddingBottom: "10px",
                fontSize: "20px",
              }}
            >
              Move
            </Typography>

            {chosenGarage ? <MoveCarChosenGarage /> : <MoveCarGarageInput />}

            <MoveButton />
            <ClearButton />

            <Cars cars={carsToMove} onClick={true} carType={"moveCar"} />
          </Grid>
        </CardContent>
      </Paper>
    </>
  );
};

export default MoveCar;
