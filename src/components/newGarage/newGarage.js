import React from "react";

import {
  CardContent,
  Typography,
  Grid,
  CardActions,
  Paper,
} from "@material-ui/core";

import NewGarageDesc from "./newGarageInputs/newGarageDesc";
import NewGarageName from "./newGarageInputs/newGarageInput";
import CreateButton from "./buttons/createButton";
import ClearButton from "./buttons/clearButton";

const NewGarage = () => {
  return (
    <>
      <Paper
        elevation={6}
        style={{ backgroundColor: "#212121", marginTop: "8px" }}
      >
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
          <Grid container justifyContent="center">
            <ClearButton />
            <CreateButton />
          </Grid>
        </CardActions>
      </Paper>
    </>
  );
};

export default NewGarage;
