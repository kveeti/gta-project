import { useDispatch } from "react-redux";
import { ICar } from "../../../../interfaces/Car";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { styled } from "../../../../stitches.config";
import { CarGrid } from "../../Cars/Grid";
import { Label } from "../Styles/Inputs";

const Container = styled("div", {
  display: "flex",
  gap: "1.1rem",
});

const MatchingCars = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);

  const onCarClick = (car: ICar) => {
    dispatch(actions.newCar.set.chosen.car(car));
  };

  // if a car has been chosen or there are no matching cars, don't show the cars
  if (!newCarState.cars.matching.length || newCarState.chosenCar) return null;

  return (
    <Container>
      <Label />
      <CarGrid single cars={newCarState.cars.matching} onClick={(car) => onCarClick(car)} />
    </Container>
  );
};

export default MatchingCars;
