import { signIn } from "next-auth/react";
import { StyledButton } from "./Styles";

export const SigninButton = () => (
  <StyledButton gray onClick={() => signIn()}>
    Sign in
  </StyledButton>
);
