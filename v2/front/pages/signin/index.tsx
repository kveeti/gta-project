import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SignInCard } from "../../components/Cards/Signin/Signin";

const Login = () => {
  const router = useRouter();
  const { data, status } = useSession();
  if (status === "loading") return null;

  if (data) {
    router.push("/", "/", { shallow: true });
    return null;
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <SignInCard />
    </>
  );
};

export default Login;
