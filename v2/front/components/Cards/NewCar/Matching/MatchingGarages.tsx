import { useDispatch } from "react-redux";
import { IGarage } from "../../../../interfaces/Garage";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { MatchingContainer } from "../../../Styles/New-cards";
import { NewCardGarageGrid } from "../../Garages/GarageGrids";
import { StyledLabel } from "../Styles";

const MatchingGarages = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);

  const onGarageClick = (garage: IGarage) => {
    if (garage.full) return;

    dispatch(actions.newCar.set.chosen.garage(garage));
  };

  if (!newCarState.garages.matching.length) return null;
  if (newCarState.chosenGarage) return null;
  if (!newCarState.inputs.garage) return null;

  return (
    <MatchingContainer>
      <StyledLabel />
      <NewCardGarageGrid
        garages={newCarState.garages.matching}
        onClick={(garage) => onGarageClick(garage)}
      />
    </MatchingContainer>
  );
};

export default MatchingGarages;
