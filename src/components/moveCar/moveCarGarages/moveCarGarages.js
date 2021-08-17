import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import MoveCarGarage from "./garage/moveCarGarage";

import { moveCar_checkChosenGarage } from "../../../actions/moveCar";

const MoveCarGarages = ({ garages }) => {
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
                  dispatch(moveCar_checkChosenGarage(garage));
                }}
              >
                <MoveCarGarage garage={garage} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default MoveCarGarages;
