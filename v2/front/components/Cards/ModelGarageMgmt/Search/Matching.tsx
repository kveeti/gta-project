import { useRouter } from "next/router";
import { ModelGarage } from "../../../../interfaces/Garage";
import { useISelector } from "../../../../state/hooks";
import { SingleGrid } from "../../../Styles/Grid";
import { Label } from "../../../Styles/Page-cards";
import { Garage } from "../../Garage";

interface Props {
  garages: ModelGarage[];
}

export const MatchingGarages = ({ garages }: Props) => {
  const router = useRouter();
  const bp = useISelector((state) => state.bp);

  const onGarageClick = (garage: ModelGarage) => {
    router.push(
      `/management/model-garages/${garage.id}`,
      `/management/model-garages/${garage.id}`,
      {
        shallow: true,
      }
    );
  };

  return (
    <>
      {bp > 1 && <Label />}
      <SingleGrid>
        {garages.map((garage: ModelGarage) => (
          <Garage onClick={(garage) => onGarageClick(garage)} key={garage.id} garage={garage} />
        ))}
      </SingleGrid>
    </>
  );
};
