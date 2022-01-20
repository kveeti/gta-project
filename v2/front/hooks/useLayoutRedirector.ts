import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../util/axios";
import { actions } from "../state/actions";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useISelector } from "../state/hooks";

export const useLayoutRedirector = () => {
  const [blocked, setBlocked] = useState(false);
  const [hasRan, setHasRan] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const users = useISelector((state) => state.users);

  const pushToSignIn = () => {
    router.push("/signin", "/signin", { shallow: true });
    localStorage.clear();
  };

  const handleAuthSuccess = (me: any) => {
    setBlocked(false);
    dispatch(actions.users.set.me(me));
  };

  useEffect(() => {
    if (hasRan) return;
    setHasRan(true);

    const getMe = async () => {
      try {
        const item = localStorage.getItem("item");

        if (!item) setBlocked(true);

        if (Date.now() <= parseInt(item)) setBlocked(false);

        if (users?.me?.id) return setBlocked(false);

        const res = await axios(config("/users/me", "GET")).catch(() => null);

        if (res?.data) return handleAuthSuccess(res.data);

        pushToSignIn();
      } catch {
        pushToSignIn();
      }
    };

    getMe();
  }, []);

  return blocked;
};
