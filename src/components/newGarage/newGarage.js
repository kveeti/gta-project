import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
} from "@material-ui/core";

import NewGarageDesc from "./newGarageInputs/newGarageDesc";
import NewGarageName from "./newGarageInputs/newGarageInput";
import CreateButton from "./createButton/createButton";
import ClearButton from "./clearButton/clearButton";

const NewGarage = () => {
  return (
    <>
      <Card style={{ backgroundColor: "#212121" }}>
        <CardContent>
          <Grid container direction="column" style={{ gridRowGap: "10px" }}>
            <Typography
              variant="button"
              style={{ color: "white", fontSize: "18px" }}
            >
              New garage
            </Typography>
            <NewGarageName />
            <NewGarageDesc />
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

export default NewGarage;
