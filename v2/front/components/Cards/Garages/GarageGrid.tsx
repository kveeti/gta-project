import { useRouter } from "next/router";
import { IGarage } from "../../../interfaces/Garage";
import { Grid } from "../../Styles/Grid";
import { Garage } from "./Garage";

interface GarageGridProps {
  garages: IGarage[];
  onClick?: (garage: IGarage) => void;
}

export const SearchGarageGrid = ({ garages }: GarageGridProps) => {
  if (!garages.length) return null;
  const router = useRouter();

  return (
    <Grid>
      {garages.map((garage: IGarage) => (
        <Garage
          key={garage.id}
          garage={garage}
          onClick={(garage: IGarage) => () => {
            // router.push(`/garage/${garage.id}`)
          }}
          showCapacity={true}
        />
      ))}
    </Grid>
  );
};
