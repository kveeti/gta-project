import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ModelGarage } from "../../../../interfaces/Garage";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { SingleGrid } from "../../../Styles/Grid";
import { Label } from "../../../Styles/Page-cards";
import { Garage } from "../../Garages/Garage";

const MatchingGarages = () => {
  const dispatch = useDispatch();

  const newGarageState = useISelector((state) => state.newGarage);
  const bp = useISelector((state) => state.bp);

  const onGarageClick = (garage: ModelGarage) => {
    if (garage.alreadyOwned) return toast.error(`You already own ${garage.name}.`);
    dispatch(actions.newGarage.set.chosenGarage(garage));
  };

  if (!newGarageState.garages.matching.length) return null;
  if (newGarageState.chosenGarage) return null;
  if (!newGarageState.inputs.garage) return null;

  return (
    <>
      {bp > 1 && <Label />}
      <SingleGrid>
        {newGarageState.garages.matching.map((garage: ModelGarage) => (
          <Garage
            key={garage.id}
            garage={garage}
            onClick={(garage: ModelGarage) => onGarageClick(garage)}
            showAlreadyOwned={true}
            notAllowed={garage.alreadyOwned}
          />
        ))}
      </SingleGrid>
    </>
  );
};

export default MatchingGarages;
