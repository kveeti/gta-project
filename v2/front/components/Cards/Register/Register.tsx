import { Title } from "../../Styles/Text";
import { SingleCardPageCard } from "../../Styles/SinglePage";
import { RegisterForm } from "./RegisterForm";

export const RegisterCard = () => {
  return (
    <SingleCardPageCard>
      <Title>Register</Title>

      <RegisterForm />
    </SingleCardPageCard>
  );
};
