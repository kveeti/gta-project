import React from "react";

import {
  CardContent,
  Typography,
  Grid,
  CardActions,
  Paper,
} from "@material-ui/core";

import DescInput from "./inputs/descInput";
import NameInput from "./inputs/nameInput";
import CreateButton from "./buttons/createButton";
import ClearButton from "./buttons/clearButton";

import { Fade } from "react-awesome-reveal";

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

            <Fade>
              <NameInput />
            </Fade>
            <Fade>
              <DescInput />
            </Fade>
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
