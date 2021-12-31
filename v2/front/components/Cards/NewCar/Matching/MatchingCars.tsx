import { useDispatch } from "react-redux";
import { ICar } from "../../../../interfaces/Car";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { MatchingContainer } from "../../../Styles/Page-cards";
import { NewCardCarGrid } from "../../Cars/CarGrids";
import { StyledLabel } from "../Styles";

const MatchingCars = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);
  const bp = useISelector((state) => state.bp);

  const onCarClick = (car: ICar) => {
    dispatch(actions.newCar.set.chosen.car(car));
  };

  if (!newCarState.cars.matching.length || newCarState.chosenCar || !newCarState.inputs.car)
    return null;

  return (
    <MatchingContainer>
      {bp > 1 && <StyledLabel />}
      <NewCardCarGrid cars={newCarState.cars.matching} onClick={(car) => onCarClick(car)} />
    </MatchingContainer>
  );
};

export default MatchingCars;
