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
              sm={6}
              md={4}
              lg={4}
              xl={3}
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
