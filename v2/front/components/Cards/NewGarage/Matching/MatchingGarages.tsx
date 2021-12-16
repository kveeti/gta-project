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

  const newGarageState = useISelector((state) => state.newGarage);

  const onGarageClick = (garage: IGarage) => {
    if (garage.full) return;

    dispatch(actions.newGarage.set.chosenGarage(garage));
  };

  if (!newGarageState.garages.matching.length) return null;
  if (newGarageState.chosenGarage) return null;
  if (!newGarageState.inputs.garage) return null;

  return (
    <Container>
      <Label />
      <GarageGrid
        single
        garages={newGarageState.garages.matching}
        onClick={(garage) => onGarageClick(garage)}
      />
    </Container>
  );
};

export default MatchingGarages;
