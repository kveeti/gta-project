import React from "react";
import { Grid } from "@material-ui/core";

import SearchGarage from "./garage/searchGarage.js";

const SearchGarages = ({ garages }) => {
  return (
    <>
      <Grid container spacing={1}>
        {garages.map((garage) => {
          return (
            <Grid item key={garage.name} xs={12}>
              <div
                style={{ cursor: "pointer", paddingBottom: "8.5px" }}
                onClick={(e) => {}}
              >
                <SearchGarage garage={garage} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default SearchGarages;
