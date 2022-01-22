import { ButtonContainer } from "../../../Styles/SinglePage";
import { StyledButton } from "../../Signin/Buttons/Styles";

export const ChangeEmailButton = () => {
  const onClick = async () => {
    // redirect to change email
  };

  return (
    <StyledButton blue onClick={onClick}>
      Change email
    </StyledButton>
  );
};
