import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IGarage } from "../../../../interfaces/Garage";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { SingleGrid } from "../../../Styles/Grid";
import { Label } from "../../../Styles/Page-cards";
import { Garage } from "../../Garage";

const MatchingGarages = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);
  const bp = useISelector((state) => state.bp);

  const onGarageClick = (garage: IGarage) => {
    if (garage.full) return toast.error(`${garage.name} is full.`);

    dispatch(actions.newCar.set.chosen.garage(garage));
  };

  if (!newCarState.garages.matching.length) return null;
  if (newCarState.chosenGarage) return null;
  if (!newCarState.inputs.garage) return null;

  return (
    <>
      {bp > 1 && <Label />}
      <SingleGrid>
        {newCarState.garages.matching.map((garage: IGarage) => (
          <Garage
            key={garage.id}
            garage={garage}
            onClick={(garage: IGarage) => onGarageClick(garage)}
            showCapacity={true}
            notAllowed={garage.full}
          />
        ))}
      </SingleGrid>
    </>
  );
};

export default MatchingGarages;
