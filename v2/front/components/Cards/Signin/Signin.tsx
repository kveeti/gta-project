import { SingleCardPageCard } from "../../Common/Cards";
import { Desc, Title } from "../../Common/Text";
import { SignInForm } from "./SignInForm";

export const SignInCard = () => {
  return (
    <SingleCardPageCard notSoWide>
      <Title padding>Sign in</Title>
      <Desc>Sign in or get a temporary test account.</Desc>

      <SignInForm />
    </SingleCardPageCard>
  );
};
