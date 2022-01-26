import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { request } from "../util/axios";
import { actions } from "../state/actions";
import { toast } from "react-toastify";

interface Props {
  setBlocked: (value: boolean) => void;
}

export const AuthenticationCheck = ({ setBlocked }: Props) => {
  if (typeof window === "undefined") return null;

  const router = useRouter();
  const dispatch = useDispatch();

  const pushToSignIn = () => {
    setBlocked(false);
    router.push("/signin", "/signin", { shallow: true });
    localStorage.clear();
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const item = localStorage.getItem("item");

        if (!item) {
          pushToSignIn();
        }

        if (Date.now() <= parseInt(item)) {
          setBlocked(false);
          const res = await request("/users/me", "GET");

          if (res?.data) {
            router.push("/", "/", { shallow: true });
            return dispatch(actions.users.set.me(res.data));
          }

          pushToSignIn();
        } else {
          pushToSignIn();
        }
      } catch {
        toast.error("Please enable cookies for this site to work.");
      }
    };

    getMe();
  }, []);

  return null;
};
