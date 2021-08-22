import { Grid } from "@material-ui/core";

import { useSelector } from "react-redux";

import SearchBar from "./searchBar";
import MoveButton from "./buttons/moveButton";

const Search = () => {
  const carsToMove = useSelector((state) => state.moveCar.carsToMove);

  return (
    <>
      <Grid container direction="row" alignItems="center" alignContent="center">
        <SearchBar />
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
