import Head from "next/head";
import { useRouter } from "next/router";
import { SignInCard } from "../../components/Cards/Signin/Signin";
import { Toast } from "../../components/Toast/Toast";
import { useEffect } from "react";
import axios from "axios";
import { config } from "../../util/axios";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getMe = async () => {
      const res = await axios(config("/users/me", "GET")).catch(() => null);

      if (!res?.data) return;
      router.push("/", "/", { shallow: true });
      dispatch(actions.users.set.me(res.data));
    };

    getMe();
  }, []);

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Toast />
      <SignInCard />
    </>
  );
};

export default Login;
