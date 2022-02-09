import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAccessTokenNoRedirect } from "../util/accessToken";

export const useAuthPageRedirector = () => {
  const router = useRouter();

  const pushToIndex = () => {
    router.push("/", "/");
  };

  useEffect(() => {
    const getMe = async () => {
      const token = await getAccessTokenNoRedirect();

      if (!token) return;

      pushToIndex();
    };

    getMe();
  }, []);
};
