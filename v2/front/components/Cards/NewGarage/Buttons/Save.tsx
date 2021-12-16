import { useDispatch } from "react-redux";
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

  const onClick = () => {};

  return (
    <StyledButton green onClick={() => onClick()} disabled={!newGarageState.chosenGarage}>
      Save
    </StyledButton>
  );
};

export default SaveButton;
