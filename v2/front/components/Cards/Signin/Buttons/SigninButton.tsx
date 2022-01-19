import { StyledButton } from "./Styles";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export const SigninButton = ({ onClick, disabled }: Props) => (
  <StyledButton blue onClick={onClick} disabled={disabled}>
    Sign in
  </StyledButton>
);
