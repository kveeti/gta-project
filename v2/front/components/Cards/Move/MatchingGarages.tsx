import { useDispatch } from "react-redux";
import { IGarage, ModelGarage } from "../../../interfaces/Garage";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { isModelGarage } from "../../../util/typeguards";
import { MatchingContainer } from "../../Styles/Page-cards";
import { NewCardGarageGrid } from "../Garages/GarageGrids";
import { StyledLabel } from "../NewCar/Styles";

const MatchingGarages = () => {
  const dispatch = useDispatch();

  const moveState = useISelector((state) => state.move);
  const bp = useISelector((state) => state.bp);

  const onGarageClick = (garage: IGarage | ModelGarage) => {
    if (isModelGarage(garage)) return;
    if (garage.full) return;
    dispatch(actions.move.set.chosenGarage(garage));
  };

  if (!moveState.matchingGarages.matching.length) return null;
  if (moveState.chosenGarage) return null;
  if (!moveState.garageInput) return null;

  return (
    <MatchingContainer>
      {bp > 1 && <StyledLabel />}
      <NewCardGarageGrid
        garages={moveState.matchingGarages.matching}
        onClick={(garage) => onGarageClick(garage)}
      />
    </MatchingContainer>
  );
};

export default MatchingGarages;
