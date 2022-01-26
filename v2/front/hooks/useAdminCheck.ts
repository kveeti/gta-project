import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../state/actions";
import { request } from "../util/axios";

export const useAdminCheck = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const handleUnauthorized = () => {
    router.push("/", "/", { shallow: true });
  };

  useEffect(() => {
    const getMe = async () => {
      const res = await request("/users/me", "GET");

      if (res?.data) {
        dispatch(actions.users.set.me(res?.data));

        if (res?.data?.role != "Admin") return handleUnauthorized();

        return setLoading(false);
      }

      handleUnauthorized();
    };

    getMe();
  }, []);

  return loading;
};
