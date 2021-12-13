import { useRouter } from "next/router";
import { Input } from "semantic-ui-react";
import { useISelector } from "../../state/hooks";

import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  if (typeof window === "undefined") return null;

  const searchState = useISelector((state) => state.search);

  const router = useRouter();

  const onSearchTermChange = async (value: string) => {
    if (!value) return router.push("/");

    router.push(
      {
        pathname: "/search",
        query: { q: value },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Input
      className={styles.searchBar}
      type="search"
      autoComplete="off"
      iconPosition="left"
      icon="search"
      placeholder="Search for anything"
      value={router.query.q || ""}
      onChange={(e, { value }) => onSearchTermChange(value)}
      autoFocus
      loading={searchState.api.loading}
      error={searchState.api.notFound || searchState.api.error}
      transparent
      inverted
    />
  );
};
