import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAccessTokenOnlyLocal } from "../util/accessToken";
import { checkAdmin } from "../util/jwt";

export const useAdminCheck = () => {
  const token = getAccessTokenOnlyLocal();

  const [viewBlocked, setViewBlocked] = useState(!!token?.length);
  const [layoutViewBlocked, setLayoutViewBlocked] = useState(true);
  const router = useRouter();

  const handleUnauthorized = () => {
    router.push("/", "/", { shallow: true });
  };

  useEffect(() => {
    const check = async () => {
      const isAdmin = await checkAdmin();
      if (!isAdmin) return handleUnauthorized();

      setViewBlocked(false);
      setLayoutViewBlocked(false);
    };

    check();
  }, []);

  return { layoutViewBlocked, viewBlocked };
};
