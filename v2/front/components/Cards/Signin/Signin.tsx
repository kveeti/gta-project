import { Desc, Title } from "../../Styles/Text";
import { SignInForm } from "./SignInForm";
import { StyledCard } from "../../Styles/SinglePage";

export const SignInCard = () => {
  return (
    <StyledCard>
      <Title>Sign in</Title>
      <Desc>Sign in or get a temporary test account.</Desc>

      <SignInForm />
    </StyledCard>
  );
};
