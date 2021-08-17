import { Grid } from "@material-ui/core";

import { useSelector } from "react-redux";

import SearchBar from "./searchBar";
import MoveButton from "./buttons/moveButton";

const Search = () => {
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        style={{ marginBottom: "5px" }}
      >
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
      </Grid>
      {carsToMove.length > 0 ? (
        <Grid container>
          <MoveButton />
        </Grid>
      ) : null}
    </>
  );
};

export default Search;
