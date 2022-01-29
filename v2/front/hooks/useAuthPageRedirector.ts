import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAccessTokenTest, getTest } from "../util/accessToken";

export const useAuthPageRedirector = () => {
  const router = useRouter();

  const pushToIndex = () => {
    router.push("/", "/", { shallow: true });
  };

  useEffect(() => {
    if (getTest()) return pushToIndex();

    const getMe = async () => {
      const token = await getAccessTokenTest();

      if (!token) return;

      pushToIndex();
    };

    getMe();
  }, []);
};
