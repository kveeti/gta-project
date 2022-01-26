import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { request } from "../util/axios";
import { actions } from "../state/actions";
import { toast } from "react-toastify";

export const useAuthPageRedirector = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const pushToIndex = (me: any) => {
    if (me) dispatch(actions.users.set.me(me));

    router.push("/", "/", { shallow: true });
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const item = localStorage.getItem("item");

        if (!item || Date.now() <= parseInt(item)) {
          const res = await request("/users/me", "GET");

          if (res?.data) return pushToIndex(res.data);
        }
      } catch {
        toast.error("Please enable cookies for this site to work.");
      }
    };

    getMe();
  });
};
