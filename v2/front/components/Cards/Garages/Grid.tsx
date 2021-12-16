import { IGarage } from "../../../interfaces/Garage";
import { Grid } from "../../Styles/Grid";
import { Garage } from "./Garage";

interface CarProps {
  garages: IGarage[];
  single?: boolean;
  onClick: any;
}

export const GarageGrid = ({ garages, single, onClick }: CarProps) => {
  if (!garages.length) return null;

  return (
    <Grid single={single}>
      {garages.map((garage: IGarage) => (
        <Garage key={garage.id} garage={garage} onClick={(garage: IGarage) => onClick(garage)} />
      ))}
    </Grid>
  );
};
