import { ResetPasswordCard } from "../../components/Cards/ResetPassword/ResetPassword";
import SingleCardPageLayout from "../../components/SingleCardPageLayout";
import { useAuthPageRedirector } from "../../hooks/useAuthPageRedirector";

const ResetPasswordPage = () => {
  useAuthPageRedirector();

  return (
    <SingleCardPageLayout>
      <ResetPasswordCard />
    </SingleCardPageLayout>
  );
};

export default ResetPasswordPage;
