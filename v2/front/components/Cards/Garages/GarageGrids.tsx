import { IGarage, ModelGarage } from "../../../interfaces/Garage";
import { Grid, SingleGrid } from "../../Styles/Grid";
import { Garage } from "./Garage";

interface GarageGridProps {
  garages: IGarage[];
  single?: boolean;
  onClick: (garage: IGarage) => void;
}

interface NewCardGarageGridProps {
  garages: IGarage[];
  onClick: (garage: IGarage | ModelGarage) => void;
}

export const GarageGrid = ({ garages, single, onClick }: GarageGridProps) => {
  if (!garages.length) return null;

  return (
    <Grid single={single}>
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
      {garages.map((garage: IGarage) => (
        <Garage onClick={(garage: IGarage) => onClick(garage)} key={garage.id} garage={garage} />
      ))}
    </SingleGrid>
  );
};
