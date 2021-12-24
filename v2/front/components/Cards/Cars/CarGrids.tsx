import { ICar } from "../../../interfaces/Car";
import { Grid, SingleGrid } from "../../Styles/Grid";
import Car from "./Car";

interface CarProps {
  cars: ICar[];
  onClick: (car: ICar) => void;
  single?: boolean;
  wide?: boolean;
}

interface NewCardCarGridProps {
  cars: ICar[];
  onClick: (car: ICar) => void;
}

export const CarGrid = ({ cars, onClick, single, wide }: CarProps) => {
  if (!cars.length) return null;

  return (
    <Grid single={single}>
      {cars.map((car: ICar) => (
        <Car onClick={(car: ICar) => onClick(car)} key={car.id} car={car} wide={wide} />
      ))}
    </Grid>
  );
};

export const NewCardCarGrid = ({ cars, onClick }: NewCardCarGridProps) => {
  if (!cars.length) return null;

  return (
    <SingleGrid>
      {cars.map((car: ICar) => (
        <Car onClick={(car: ICar) => onClick(car)} key={car.id} car={car} />
      ))}
    </SingleGrid>
  );
};
