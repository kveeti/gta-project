import { useDispatch } from "react-redux";
import { ICar, ModelCar } from "../../../../interfaces/Car";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { SingleGrid } from "../../../Styles/Grid";
import { Label } from "../../../Styles/Page-cards";
import Car from "../../Car";

const MatchingCars = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);
  const bp = useISelector((state) => state.bp);

  const onCarClick = (car: ModelCar) => {
    dispatch(actions.newCar.set.chosen.car(car));
  };

  if (!newCarState.cars.matching.length || newCarState.chosenCar || !newCarState.inputs.car)
    return null;

  return (
    <>
      {bp > 1 && <Label />}
      <SingleGrid>
        {newCarState.cars.matching.map((car: ModelCar) => (
          <Car onClick={(car: ModelCar) => onCarClick(car)} key={car.name} car={car} />
        ))}
      </SingleGrid>
    </>
  );
};

export default MatchingCars;
