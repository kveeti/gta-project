import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core/";

import "./styles.css";

const Garage = ({ garage }) => {
  return (
    <Card style={{ backgroundColor: "#212121" }} variant="outlined">
      <CardContent>
        <Grid container justifyContent="flex-start">
          <Typography
            style={{ color: "white", fontSize: "15px" }}
            variant="button"
          >
            {garage.name}
            {garage.desc.length ? ` - ${garage.desc}` : ""}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Garage;
