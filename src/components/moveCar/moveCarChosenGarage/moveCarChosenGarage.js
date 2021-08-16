import React from "react";

import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { moveCar_checkChosenGarage } from "../../../actions/moveCar";

const MoveCarChosenGarage = () => {
  const dispatch = useDispatch();

  const garage = useSelector((state) => state.moveCar.chosenGarage);

  return (
    <>
      {garage ? (
        <div
          onClick={(e) => {
            dispatch(moveCar_checkChosenGarage(garage));
          }}
          style={{ cursor: "pointer" }}
        >
          <Card style={{ backgroundColor: "#181818" }} variant="outlined">
            <CardContent>
              <Grid container justifyContent="flex-start">
                <Typography
                  style={{ color: "white", fontSize: "15px" }}
                  variant="button"
                >
                  {garage.name}
                  {garage.desc.length ? ` - ${garage.desc} - ` : " - "}
                  {garage.cars.length > 0
                    ? garage.cars.length > 1
                      ? `${garage.cars.length} cars`
                      : `${garage.cars.length} car`
                    : `${garage.cars.length} cars`}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default MoveCarChosenGarage;
