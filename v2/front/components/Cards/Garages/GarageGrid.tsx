import { IGarage } from "../../../interfaces/Garage";
import { Grid } from "../../Styles/Grid";
import { Garage } from "./Garage";

interface GarageGridProps {
  garages: IGarage[];
  onClick?: (garage: IGarage) => void;
}

export const SearchGarageGrid = ({ garages, onClick }: GarageGridProps) => {
  if (!garages.length) return null;

  return (
    <Grid>
      {garages.map((garage: IGarage) => (
        <Garage
          key={garage.id}
          garage={garage}
          onClick={(garage: IGarage) => onClick(garage)}
          showCapacity={true}
        />
      ))}
    </Grid>
  );
};
