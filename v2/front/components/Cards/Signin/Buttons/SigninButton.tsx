import { signIn } from "next-auth/react";
import { StyledButton } from "./Styles";

export const SigninButton = () => (
  <StyledButton blue onClick={() => signIn()}>
    Sign in
  </StyledButton>
);
