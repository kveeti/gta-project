import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAccessToken, getAccessTokenOnlyLocal } from "../util/accessToken";

export const useAuthPageRedirector = () => {
  const router = useRouter();

  const pushToIndex = () => {
    router.push("/", "/", { shallow: true });
  };

  useEffect(() => {
    if (getAccessTokenOnlyLocal()) return pushToIndex();

    const getMe = async () => {
      const token = await getAccessToken();

      if (!token) return;

      pushToIndex();
    };

    getMe();
  }, []);
};
