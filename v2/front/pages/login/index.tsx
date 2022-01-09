import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SignInCard } from "../../components/Cards/Signin/Signin";

export default () => {
  const router = useRouter();
  const { data, status } = useSession();
  if (status === "loading") return null;

  if (data) {
    router.push("/", "/", { shallow: true });
    return null;
  }

  return <SignInCard />;
};
