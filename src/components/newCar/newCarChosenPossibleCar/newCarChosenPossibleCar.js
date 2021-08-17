import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, Typography } from "@material-ui/core";
import { newCar_checkChosenPossibleCar } from "../../../actions/newCar";

const NewCarChosenPossibleCar = () => {
  const dispatch = useDispatch();

  const car = useSelector((state) => state.newCar.chosenPossibleCar);

  return (
    <>
      {car ? (
        <div
          onClick={(e) => {
            dispatch(newCar_checkChosenPossibleCar(car));
          }}
          style={{ cursor: "pointer" }}
        >
          <Card style={{ backgroundColor: "#181818" }} variant="outlined">
            <CardContent>
              <Typography variant="body1" style={{ color: "white" }}>
                {car.manufacturer} - {car.name}
              </Typography>
              <Typography variant="caption" style={{ color: "white" }}>
                {car.class}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default NewCarChosenPossibleCar;
