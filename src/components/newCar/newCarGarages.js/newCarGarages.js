import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import NewCarGarage from "./garage/newCarGarage.js";

import { newCar_checkChosenGarage } from "../../../actions/newCar.js";

const NewCarGarages = ({ garages }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={1}>
        {garages.map((garage) => {
          return (
            <Grid item key={garage.name} xs={12}>
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  dispatch(newCar_checkChosenGarage(garage));
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
