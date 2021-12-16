import { useDispatch } from "react-redux";
import { IGarage } from "../../../../interfaces/Garage";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { styled } from "../../../../stitches.config";
import { GarageGrid } from "../../Garages/Grid";
import { Label } from "../Styles/Inputs";

const Container = styled("div", {
  display: "flex",
  gap: "1.1rem",
});

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
    <Container>
      <Label />
      <GarageGrid
        single
        garages={newCarState.garages.matching}
        onClick={(garage) => onGarageClick(garage)}
      />
    </Container>
  );
};

export default MatchingGarages;
