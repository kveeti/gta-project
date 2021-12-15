import { IGarage } from "../../interfaces/Garage";
import { Grid } from "../Defaults/Grid";
import { Garage, NewCarDialogGarage } from "./Garage/Garage";

interface CarProps {
  garages: IGarage[];
  single?: boolean;
  newCar?: boolean;
}

export const GarageGrid = ({ garages, single, newCar }: CarProps) => {
  if (!garages.length) return null;

  return (
    <Grid single={single}>
      {garages.map((garage: IGarage) =>
        newCar ? (
          <NewCarDialogGarage key={garage.id} garage={garage} />
        ) : (
          <Garage key={garage.id} garage={garage} />
        )
      )}
    </Grid>
  );
};
