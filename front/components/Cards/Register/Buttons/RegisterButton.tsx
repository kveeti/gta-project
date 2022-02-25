import { StyledButton } from "../../Signin/Buttons/Styles";

interface Props {
  disabled: boolean;
}

export const RegisterButton = ({ disabled }: Props) => (
  <StyledButton blue disabled={disabled} type="submit">
    Register
  </StyledButton>
);
