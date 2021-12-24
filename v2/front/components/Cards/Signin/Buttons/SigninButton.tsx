import { signIn } from "next-auth/react";
import { StyledButton } from "./Styles";

export const SigninButton = () => (
  <StyledButton gray onClick={() => signIn("google")}>
    Sign in with Google
  </StyledButton>
);
