import { Grid } from "@material-ui/core";
import Car from "./car/car";

const Cars = ({ cars, carType }) => {
  let isPossibleCar = false;

  if (carType.includes("possiblecar")) {
    isPossibleCar = true;
  }

  return (
    <Grid container spacing={1} style={{ marginTop: "0.25em" }}>
      {cars.map((car) => {
        return (
          <Grid
            item
            key={isPossibleCar ? car.name : car._id}
            xs={12}
            sm={isPossibleCar ? 12 : 6}
            md={isPossibleCar ? 12 : 4}
            lg={isPossibleCar ? 12 : 3}
          >
            <Car car={car} carType={carType} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Cars;
