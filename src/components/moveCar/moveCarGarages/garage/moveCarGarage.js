import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core/";

const MoveCarGarage = ({ garage }) => {
  return (
    <Card style={{ backgroundColor: "#212121" }} variant="outlined">
      <CardContent>
        <Grid container justifyContent="flex-start">
          <Typography
            style={{ color: "white", fontSize: "15px" }}
            variant="button"
          >
            {garage.name}
            {garage.desc.length ? ` - ${garage.desc} - ` : " - "}
            {garage.cars.length > 0
              ? garage.cars.length > 1
                ? `${garage.cars.length} cars`
                : `${garage.cars.length} car`
              : `${garage.cars.length} cars`}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MoveCarGarage;
