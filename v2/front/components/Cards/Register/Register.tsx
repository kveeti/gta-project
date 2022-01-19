import { Title } from "../../Styles/Text";
import { StyledCard } from "../../Styles/SinglePage";
import { RegisterForm } from "./RegisterForm";

export const RegisterCard = () => {
  return (
    <StyledCard>
      <Title>Register</Title>

      <RegisterForm />
    </StyledCard>
  );
};
