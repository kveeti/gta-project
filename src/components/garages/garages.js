import { Grid } from "@material-ui/core";

import Garage from "./garage/garage";

import { Fade } from "react-awesome-reveal";

const Garages = ({ garages, onClick = false, location }) => {
  return (
    <>
      <Grid container spacing={1} style={{ marginTop: "4px" }}>
        {garages.map((garage) => {
          return (
            <Grid item key={garage.name} xs={12}>
              <Fade duration={10}>
                <Garage garage={garage} location={location} onClick={onClick} />
              </Fade>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Garages;
