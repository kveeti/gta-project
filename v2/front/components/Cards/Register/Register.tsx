import { SingleCardPageCard } from "../../Styles/Cards";
import { Title } from "../../Styles/Text";
import { RegisterForm } from "./RegisterForm";

export const RegisterCard = () => {
  return (
    <SingleCardPageCard>
      <Title padding>Register</Title>

      <RegisterForm />
    </SingleCardPageCard>
  );
};
