import { StyledButton } from "../../Signin/Buttons/Styles";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export const RegisterButton = ({ onClick, disabled }: Props) => (
  <StyledButton blue onClick={onClick} disabled={disabled}>
    Register
  </StyledButton>
);
