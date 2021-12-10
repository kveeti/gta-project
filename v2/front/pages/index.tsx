import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MenuBar } from "../components/MenuBar/MenuBar";

import "semantic-ui-css/semantic.min.css";

export default () => {
  if (typeof window === "undefined") return null;

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  if (session)
    return (
      <>
        <MenuBar />
      </>
    );

  if (!loading && !session) return router.push("/api/auth/signin");

  return null;
};
