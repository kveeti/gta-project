import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { styled } from "../../../../stitches.config";
import { BaseBtn } from "../../../Styles/Buttons";

const StyledButton = styled(BaseBtn, {
  padding: "0 2rem",
  height: "100%",
});

const SaveButton = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);

  const onClick = () => {
    if (!newCarState.chosenCar || !newCarState.chosenGarage) return;

    dispatch(actions.newCar.save(newCarState.chosenCar.id, newCarState.chosenGarage.id));
  };

  const bothChosen = newCarState.chosenCar && newCarState.chosenGarage;

  return (
    <StyledButton disabled={!bothChosen} green onClick={() => onClick()}>
      Save
    </StyledButton>
  );
};

export default SaveButton;
