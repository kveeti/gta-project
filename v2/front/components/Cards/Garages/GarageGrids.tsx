import { IGarage, ModelGarage } from "../../../interfaces/Garage";
import { Grid, SingleGrid } from "../../Styles/Grid";
import { Garage } from "./Garage";

interface GarageGridProps {
  garages: IGarage[];
  onClick: (garage: IGarage) => void;
}

interface NewCardGarageGridProps {
  garages: IGarage[] | ModelGarage[];
  onClick: (garage: IGarage | ModelGarage) => void;
}

export const GarageGrid = ({ garages, onClick }: GarageGridProps) => {
  if (!garages.length) return null;

  return (
    <Grid>
      {garages.map((garage: IGarage) => (
        <Garage key={garage.id} garage={garage} onClick={(garage: IGarage) => onClick(garage)} />
      ))}
    </Grid>
  );
};

export const NewCardGarageGrid = ({ garages, onClick }: NewCardGarageGridProps) => {
  if (!garages.length) return null;

  return (
    <SingleGrid>
      {garages.map((garage: IGarage | ModelGarage) => (
        <Garage key={garage.id} garage={garage} onClick={(garage) => onClick(garage)} />
      ))}
    </SingleGrid>
  );
};
