import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Car from "./car/car";

import { moveCar_checkCar, moveCar_clear } from "../../actions/moveCar.js";
import { newCar_checkChosenPossibleCar } from "../../actions/newCar";

const Cars = ({ cars, onClick = false, carType }) => {
  const dispatch = useDispatch();

  const carsToMove = useSelector((state) => state.moveCar.carsToMove);
  const isMovingState = useSelector((state) => state.moveCar.isMoving);

  const checkMoveCar = (car) => {
    if (carType !== "moveCar" && carType !== "search") return;

    if (carsToMove.length === 1 && isMovingState) {
      return dispatch(moveCar_clear());
    }

    dispatch(moveCar_checkCar(car));
  };

  const checkPossibleCar = (car) => {
    if (carType !== "possibleCar") return;

    dispatch(newCar_checkChosenPossibleCar(car));
  };

  return (
    <>
      <Grid container spacing={1} style={{ marginTop: "4px" }}>
        {cars.map((car) => {
          return (
            <Grid
              item
              key={carType === "possibleCar" ? car.name : car._id}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
            >
              <div
                key={car.name}
                style={{ cursor: onClick ? "pointer" : null }}
                onClick={
                  onClick
                    ? () => {
                        checkMoveCar(car);

                        checkPossibleCar(car);
                      }
                    : null
                }
              >
                <Car car={car} carType={carType} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Cars;
