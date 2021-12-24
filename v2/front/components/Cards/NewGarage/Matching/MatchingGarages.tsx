import { useDispatch } from "react-redux";
import { IGarage, ModelGarage } from "../../../../interfaces/Garage";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { isModelGarage } from "../../../../util/typeguards";
import { MatchingContainer } from "../../../Styles/New-cards";
import { NewCardGarageGrid } from "../../Garages/GarageGrids";
import { StyledLabel } from "../Styles";

const MatchingGarages = () => {
  const dispatch = useDispatch();

  const newGarageState = useISelector((state) => state.newGarage);
  const bp = useISelector((state) => state.bp);

  const onGarageClick = (garage: IGarage | ModelGarage) => {
    if (isModelGarage(garage)) return;
    if (garage.full) return;

    dispatch(actions.newGarage.set.chosenGarage(garage));
  };

  if (!newGarageState.garages.matching.length) return null;
  if (newGarageState.chosenGarage) return null;
  if (!newGarageState.inputs.garage) return null;

  return (
    <MatchingContainer>
      {bp > 1 && <StyledLabel />}
      <NewCardGarageGrid
        garages={newGarageState.garages.matching}
        onClick={(garage) => onGarageClick(garage)}
      />
    </MatchingContainer>
  );
};

export default MatchingGarages;
