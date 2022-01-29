import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAccessToken, getAccessTokenOnlyLocal } from "../util/accessToken";

export const useIsLoggedIn = () => {
  const [viewBlocked, setViewBlocked] = useState(getAccessTokenOnlyLocal() ? false : true);
  const router = useRouter();

  const pushToSignIn = () => {
    localStorage.clear();
    router.push("/signin", "/signin", { shallow: true });
  };

  useEffect(() => {
    const func = async () => {
      const token = await getAccessToken();

      if (!token) return pushToSignIn();

      setViewBlocked(false);
    };

    func();
  }, []);

  return viewBlocked;
};
