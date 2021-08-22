import { CardContent, Typography, Grid, Paper } from "@material-ui/core";

import { useSelector } from "react-redux";

import Cars from "../cars/cars.js";

import MoveCarGarageInput from "./moveCarGarageInput";
import MoveButton from "./buttons/moveButton";
import ClearButton from "./buttons/clearButton";
import Garage from "../garages/garage/garage.js";

const MoveCar = ({ display }) => {
  const chosenGarage = useSelector((state) => state.moveCar.chosenGarage);
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);

  return (
    <>
      <Paper
        style={{
          backgroundColor: "#212121",

          marginTop: "8px",
        }}
        elevation={4}
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

            {chosenGarage ? (
              <Garage
                garage={chosenGarage}
                location={"chosenMoveCarGarage"}
                onClick={true}
              />
            ) : (
              <MoveCarGarageInput />
            )}

            <div>
              <MoveButton />
              <ClearButton />
            </div>

            <Cars cars={carsToMove} onClick={true} carType={"carsToMove"} />
          </Grid>
        </CardContent>
      </Paper>
    </>
  );
};

export default MoveCar;
