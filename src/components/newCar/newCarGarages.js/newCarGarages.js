import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import NewCarGarage from "./garage/newCarGarage.js";

import {
  newCar_setGarageId,
  newCar_setGarageName,
  newCar_setGarages,
} from "../../../actions/newCar.js";

const NewCarGarages = ({ garages }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={1}>
        {garages.map((garage) => {
          return (
            <Grid item key={garage.name} xs={12}>
              <div
                style={{ cursor: "pointer", paddingBottom: "8.5px" }}
                onClick={(e) => {
                  let garageName;

                  if (garage.desc) {
                    garageName = `${garage.name} - ${garage.desc}`;
                  }

                  garageName = garage.name;

                  dispatch(newCar_setGarageName(garageName));
                  dispatch(newCar_setGarageId(garage._id));
                  dispatch(newCar_setGarages([]));
                }}
              >
                <NewCarGarage garage={garage} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default NewCarGarages;
