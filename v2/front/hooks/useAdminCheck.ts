import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useISelector } from "../state/hooks";
import { getAccessTokenOnlyLocal } from "../util/accessToken";
import { paths } from "../util/constants";
import { useGetMe } from "./useGetMe";

export const useAdminCheck = () => {
  useGetMe();
  const me = useISelector((state) => state.users.me);
  const token = getAccessTokenOnlyLocal();

  const [viewBlocked, setViewBlocked] = useState(true);
  const [layoutViewBlocked, setLayoutViewBlocked] = useState(token ? false : true);
  const router = useRouter();

  const handleUnauthorized = () => {
    router.push(paths.home());
  };

  useEffect(() => {
    const check = async () => {
      if (me?.role !== "Admin") return handleUnauthorized();

      setViewBlocked(false);
      setLayoutViewBlocked(false);
    };

    check();
  }, []);

  return { layoutViewBlocked, viewBlocked };
};
