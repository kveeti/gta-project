import React from "react";

import { Grid } from "@material-ui/core";

import { useSelector } from "react-redux";

import SearchBar from "./searchBar/searchBar.js";
import MoveButton from "./moveButton/moveButton.js";
import LogoutButton from "./logoutButton/logoutButton.js";

const Search = () => {
  const carsToMove = useSelector((state) => state.carsToMove);

  return (
    <>
      <Grid
        container
        direction="row"
        spacing={1}
        alignItems="center"
        style={{ marginBottom: "1.5px" }}
        xs={12}
      >
        <Grid item xs={2} lg={1}>
          <LogoutButton />
        </Grid>
        <Grid item xs={10} lg={11}>
          <SearchBar />
        </Grid>
      </Grid>
      {carsToMove.length > 0 ? (
        <Grid container xs={12}>
          <MoveButton />
        </Grid>
      ) : null}
    </>
  );
};

export default Search;
