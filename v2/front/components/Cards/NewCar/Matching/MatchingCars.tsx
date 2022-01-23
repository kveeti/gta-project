import { useDispatch } from "react-redux";
import { ICar } from "../../../../interfaces/Car";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { Label } from "../../../Styles/Page-cards";
import { NewCardCarGrid } from "../../Cars/CarGrids";

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
    <>
      {bp > 1 && <Label />}
      <NewCardCarGrid cars={newCarState.cars.matching} onClick={(car) => onCarClick(car)} />
    </>
  );
};

export default MatchingCars;
