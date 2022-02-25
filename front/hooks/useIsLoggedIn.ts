import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAccessToken, getAccessTokenOnlyLocal } from "../util/accessToken";
import { useDispatch } from "react-redux";
import { actions } from "../state/actions";
import { paths } from "../util/constants";

export const useIsLoggedIn = () => {
  const [viewBlocked, setViewBlocked] = useState(getAccessTokenOnlyLocal() ? false : true);
  const router = useRouter();
  const dispatch = useDispatch();

  const pushToSignIn = () => {
    localStorage.clear();
    dispatch(actions.reset.resetState());
    router.push(paths.signin());
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
