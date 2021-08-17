import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { moveCar_checkChosenGarage } from "../../actions/moveCar";
import { newCar_checkChosenGarage } from "../../actions/newCar";
import Garage from "./garage/garage";

const Garages = ({ garages, onClick = false, location }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={1} style={{ marginTop: "4px" }}>
        {garages.map((garage) => {
          return (
            <Grid item key={garage.name} xs={12}>
              <div
                style={{ cursor: onClick ? "pointer" : null }}
                onClick={
                  onClick
                    ? (e) => {
                        if (location === "newCar") {
                          return dispatch(newCar_checkChosenGarage(garage));
                        }

                        if (location === "moveCar") {
                          return dispatch(moveCar_checkChosenGarage(garage));
                        }
                      }
                    : null
                }
              >
                <Garage garage={garage} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Garages;
