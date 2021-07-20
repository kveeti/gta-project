import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import Garage from "./garage/garage.js";

import {
  setGarageInput,
  clearGarages,
  setNewGarageId,
} from "../../actions/garages.js";

const Garages = ({ garages }) => {
  const dispatch = useDispatch();

  return (
    <>
      {garages === 204 ? null : (
        <Grid container spacing={1}>
          {garages.map((garage) => {
            return (
              <Grid item key={garage.name} xs={12}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    dispatch(setGarageInput(garage.name + " - " + garage.desc));
                    dispatch(setNewGarageId(garage.ID));
                    dispatch(clearGarages());
                  }}
                >
                  <Garage garage={garage} />
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Garages;
