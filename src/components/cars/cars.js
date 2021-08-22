import { Grid } from "@material-ui/core";

import Car from "./car/car";

const Cars = ({ cars, onClick, carType }) => {
  return (
    <>
      <Grid container spacing={1} style={{ marginTop: "4px" }}>
        {cars.map((car) => {
          return (
            <Grid
              item
              key={carType === "possibleCar" ? car.name : car._id}
              xs={12}
              sm={carType === "possibleCar" ? 12 : 6}
              md={carType === "possibleCar" ? 12 : 4}
              lg={carType === "possibleCar" ? 12 : 3}
            >
              <Car car={car} carType={carType} onClick={onClick} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Cars;
