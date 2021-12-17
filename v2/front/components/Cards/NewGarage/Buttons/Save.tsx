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

  const newGarageState = useISelector((state) => state.newGarage);

  const onClick = () => {
    dispatch(actions.newGarage.save(newGarageState.chosenGarage.id, newGarageState.inputs.desc));
  };

  const saving = newGarageState.api.saving;

  return (
    <StyledButton green onClick={() => onClick()} disabled={!newGarageState.chosenGarage || saving}>
      Save
    </StyledButton>
  );
};

export default SaveButton;
