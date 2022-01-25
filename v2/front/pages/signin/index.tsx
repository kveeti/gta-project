import { SignInCard } from "../../components/Cards/Signin/Signin";
import SingleCardPageLayout from "../../components/SingleCardPageLayout";
import { useAuthPageRedirector } from "../../hooks/useAuthPageRedirector";

const Login = () => {
  useAuthPageRedirector();

  return (
    <SingleCardPageLayout title="Sign in">
      <SignInCard />
    </SingleCardPageLayout>
  );
};

export default Login;
