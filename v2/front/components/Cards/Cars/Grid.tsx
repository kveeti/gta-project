import { ICar } from "../../../interfaces/Car";
import { Grid } from "../../Styles/Grid";
import Car from "./Car";

interface CarProps {
  cars: ICar[];
  onClick: any;
  single?: boolean;
}

export const CarGrid = ({ cars, onClick, single }: CarProps) => {
  if (!cars.length) return null;

  return (
    <Grid single={single}>
      {cars.map((car: ICar) => (
        <Car onClick={(car: ICar) => onClick(car)} key={car.id} car={car} />
      ))}
    </Grid>
  );
};
