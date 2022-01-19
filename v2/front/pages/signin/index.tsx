import { SignInCard } from "../../components/Cards/Signin/Signin";
import SingleCardPageLayout from "../../components/SingleCardPageLayout";

const Login = () => {
  return (
    <SingleCardPageLayout title="Sign in">
      <SignInCard />
    </SingleCardPageLayout>
  );
};

export default Login;
