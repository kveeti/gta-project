import SingleCardPageLayout from "../../components/Layouts/SingleCardPageLayout";
import { RegisterCard } from "../../components/Cards/Register/Register";
import { useAuthPageRedirector } from "../../hooks/useAuthPageRedirector";

const Register = () => {
  useAuthPageRedirector();

  return (
    <SingleCardPageLayout title="Register">
      <RegisterCard />
    </SingleCardPageLayout>
  );
};

export default Register;
