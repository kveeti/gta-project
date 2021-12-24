import { signIn } from "next-auth/react";
import { StyledButton } from "./Styles";

export const TestButton = () => (
  <StyledButton gray onClick={() => signIn("credentials")}>
    Test account
  </StyledButton>
);
