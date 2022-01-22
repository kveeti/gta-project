import { ButtonContainer } from "../../../Styles/SinglePage";
import { StyledButton } from "../../Signin/Buttons/Styles";

export const ChangePasswordButton = () => {
  const onClick = async () => {
    // redirect to change password
  };

  return (
    <StyledButton blue onClick={onClick}>
      Change password
    </StyledButton>
  );
};
