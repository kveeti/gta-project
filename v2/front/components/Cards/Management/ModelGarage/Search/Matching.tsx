import { useRouter } from "next/router";
import { ModelGarage } from "../../../../../interfaces/Garage";
import { useISelector } from "../../../../../state/hooks";
import { paths } from "../../../../../util/constants";
import { SingleGrid } from "../../../../Common/Grids";
import { Label } from "../../../../Common/Text";
import { Garage } from "../../../Garage";

interface Props {
  garages: ModelGarage[];
}

export const MatchingGarages = ({ garages }: Props) => {
  const router = useRouter();
  const bp = useISelector((state) => state.bp);

  const onGarageClick = (garage: ModelGarage) => {
    router.push(paths.mgmtModelGarageEdit(garage.id));
  };

  return (
    <>
      {bp > 1 && <Label />}
      <SingleGrid>
        {garages.map((car: ModelGarage) => (
          <Garage onClick={(garage: ModelGarage) => onGarageClick(car)} key={car.id} garage={car} />
        ))}
      </SingleGrid>
    </>
  );
};
