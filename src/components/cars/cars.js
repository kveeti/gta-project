import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Car from "./car/car";

import { checkCar, moveCar_clear } from "../../actions/moveCar.js";

const Cars = ({ cars, onClick = false, page }) => {
  const dispatch = useDispatch();

  const carsToMove = useSelector((state) => state.moveCar.carsToMove);
  const isMovingState = useSelector((state) => state.moveCar.isMoving);

  return (
    <>
      <Grid container spacing={1}>
        {cars.map((car) => {
          return (
            <Grid item key={car._id} xs={12} sm={6} md={4} lg={4} xl={3}>
              <div
                key={car.name}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (!onClick) return;
                  if (
                    page === "move_car" &&
                    carsToMove.length === 1 &&
                    isMovingState
                  ) {
                    return dispatch(moveCar_clear());
                  }
                  dispatch(checkCar(car));
                }}
              >
                <Car car={car} page={page} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Cars;
