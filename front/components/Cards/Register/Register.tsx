import { SingleCardPageCard } from "../../Common/Cards";
import { Title } from "../../Common/Text";
import { RegisterForm } from "./RegisterForm";

export const RegisterCard = () => {
  return (
    <SingleCardPageCard>
      <Title padding>Register</Title>

      <RegisterForm />
    </SingleCardPageCard>
  );
};
