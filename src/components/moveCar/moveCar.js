import { Card, CardContent, Typography, Grid, Button } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { move, forceIsMoving, moveCar_clear } from "../../actions/moveCar";
import { search } from "../../actions/search.js";

import Cars from "../cars/cars.js";

import MoveCarGarageInput from "./moveCarGarageInput";
import MoveCarChosenGarage from "./moveCarChosenGarage/moveCarChosenGarage";

const MoveCar = () => {
  const dispatch = useDispatch();

  const searchInput = useSelector((state) => state.search.input);

  const chosenGarage = useSelector((state) => state.moveCar.chosenGarage);
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);

  return (
    <>
      <Card
        style={{ backgroundColor: "#212121", marginBottom: "7.5px" }}
        variant="outlined"
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

            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={chosenGarage ? false : true}
              onClick={async () => {
                await dispatch(move(carsToMove, chosenGarage._id));
                dispatch(search(searchInput));
                dispatch(forceIsMoving(false));
              }}
            >
              {carsToMove.length > 1
                ? `Move ${carsToMove.length} cars`
                : `Move ${carsToMove.length} car`}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={async () => {
                dispatch(moveCar_clear());
                dispatch(forceIsMoving(false));
              }}
            >
              Clear cars
            </Button>

            <Cars cars={carsToMove} onClick={true} page={"move_car"} />
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default MoveCar;
