import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SearchBar } from "../components/searchBar";

export default () => {
  if (typeof window === "undefined") return null;

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  if (session) return <SearchBar />;

  if (!loading && !session) return router.push("/api/auth/signin");

  return null;
};
