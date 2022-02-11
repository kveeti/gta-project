import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAccessTokenNoRedirect } from "../util/accessToken";
import { paths } from "../util/constants";

export const useAuthPageRedirector = () => {
  const router = useRouter();

  const pushToIndex = () => {
    router.push(paths.home());
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
