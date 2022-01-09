import { useDispatch } from "react-redux";
import { IGarage } from "../../../interfaces/Garage";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { SingleGrid } from "../../Styles/Grid";
import { MatchingContainer } from "../../Styles/Page-cards";
import { Garage } from "../Garages/Garage";
import { StyledLabel } from "../NewCar/Styles";
import { toast } from "react-toastify";

const MatchingGarages = () => {
  const dispatch = useDispatch();

  const moveState = useISelector((state) => state.move);
  const bp = useISelector((state) => state.bp);
  const checkedCars = useISelector((state) => state.checked.cars);

  const onGarageClick = (garage: IGarage) => {
    if (garage.full) return toast.error(`${garage.name} is full`);

    if (checkedCars.length > garage.room)
      return toast.error(`${garage.name} doesn't have enough room`);

    dispatch(actions.move.set.chosenGarage(garage));
  };

  if (!moveState.matchingGarages.matching.length) return null;
  if (moveState.chosenGarage) return null;
  if (!moveState.garageInput) return null;

  return (
    <MatchingContainer>
      {bp > 1 && <StyledLabel />}
      <SingleGrid>
        {moveState.matchingGarages.matching.map((garage: IGarage) => (
          <Garage
            key={garage.id}
            garage={garage}
            onClick={(garage: IGarage) => onGarageClick(garage)}
            showCapacity={true}
            notAllowed={checkedCars.length > garage.room}
          />
        ))}
      </SingleGrid>
    </MatchingContainer>
  );
};

export default MatchingGarages;
