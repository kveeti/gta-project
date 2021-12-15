import { ICar } from "../../interfaces/Car";
import { Grid } from "../Defaults/Grid";
import Car from "./Car/Car";
import ModelCar from "./Car/ModelCar";

interface CarProps {
  cars: ICar[];
  single?: boolean;
  model?: boolean;
}

export const CarGrid = ({ cars, single, model }: CarProps) => {
  if (!cars.length) return null;

  return (
    <Grid single={single}>
      {cars.map((car: ICar) =>
        model ? <ModelCar key={car.id} car={car} /> : <Car key={car.id} car={car} />
      )}
    </Grid>
  );
};
