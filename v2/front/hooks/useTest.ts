import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAccessTokenTest, getTest } from "../util/accessToken";

export const useTest = () => {
  const [viewBlocked, setViewBlocked] = useState(getTest() ? false : true);
  const router = useRouter();

  const pushToSignIn = () => {
    localStorage.clear();
    router.push("/signin", "/signin", { shallow: true });
  };

  useEffect(() => {
    const func = async () => {
      const token = await getAccessTokenTest();

      if (!token) return pushToSignIn();

      setViewBlocked(false);
    };

    func();
  }, []);

  return viewBlocked;
};
