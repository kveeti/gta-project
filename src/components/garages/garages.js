import { Grid } from "@material-ui/core";

import Garage from "./garage/garage";

const Garages = ({ garages, onClick = false, location }) => {
  return (
    <>
      <Grid container spacing={1} style={{ marginTop: "4px" }}>
        {garages.map((garage) => {
          return (
            <Grid item key={garage.name} xs={12}>
              <Garage garage={garage} location={location} onClick={onClick} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Garages;
