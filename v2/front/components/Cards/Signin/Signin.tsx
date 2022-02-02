import { Desc, Title } from "../../Styles/Text";
import { SignInForm } from "./SignInForm";
import { SingleCardPageCard } from "../../Styles/SinglePage";

export const SignInCard = () => {
  return (
    <SingleCardPageCard notSoWide>
      <Title>Sign in</Title>
      <Desc>Sign in or get a temporary test account.</Desc>

      <SignInForm />
    </SingleCardPageCard>
  );
};
