import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core/";

import SelectGarage from "../garages/selectGarage.js";

import CreateButton from "./createButton/createButton.js";
import ClearButton from "./clearButton/clearButton.js";

import CarNameField from "./carNameField/carNameField.js";

const NewCar = () => {
  return (
    <>
      <Card
        style={{ backgroundColor: "#212121", marginBottom: "9.5px" }}
        variant="outlined"
      >
        <CardContent>
          <Grid container direction="column" style={{ gridRowGap: "10px" }}>
            <Typography
              variant="body1"
              style={{ color: "white", fontSize: "20px" }}
            >
              New car
            </Typography>
            <SelectGarage />
            <CarNameField />
          </Grid>
        </CardContent>

        <CardActions>
          <Grid
            container
            justifyContent="center"
            style={{ gridColumnGap: "10px" }}
          >
            <ClearButton />
            <CreateButton />
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default NewCar;
