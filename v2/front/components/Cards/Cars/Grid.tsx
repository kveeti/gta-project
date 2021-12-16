import { ICar } from "../../../interfaces/Car";
import { Grid } from "../../Styles/Grid";
import Car from "./Car/Car";

interface CarProps {
  cars: ICar[];
  single?: boolean;
  model?: boolean;
  onClick: any;
}

export const CarGrid = ({ cars, single, onClick }: CarProps) => {
  if (!cars.length) return null;

  return (
    <Grid single={single}>
      {cars.map((car: ICar) => (
        <Car onClick={(car: ICar) => onClick(car)} key={car.id} car={car} />
      ))}
    </Grid>
  );
};
