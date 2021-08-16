import React from "react";
import { Grid } from "@material-ui/core";

import SearchGarage from "./garage/searchGarage.js";

const SearchGarages = ({ garages }) => {
  return (
    <>
      <Grid container spacing={1} style={{ paddingBottom: "8.5px" }}>
        {garages.map((garage) => {
          return (
            <Grid item key={garage.name} xs={12}>
              <div style={{ cursor: "pointer" }} onClick={(e) => {}}>
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
