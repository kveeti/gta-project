import { useRouter } from "next/router";
import { Input } from "semantic-ui-react";
import { search } from "../GlobalState/actions/search";
import { useIDispatch, useISelector } from "../GlobalState/hooks";

import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  if (typeof window === "undefined") return null;

  const dispatch = useIDispatch();
  const searchState = useISelector((state) => state.search);

  const router = useRouter();

  const onSearchTermChange = (value: string) => {
    dispatch(search.setQuery(value));

    if (!value.length) return router.push("/");

    router.push(`/search`);
  };

  return (
    <Input
      className={styles.searchBar}
      type="search"
      autocomplete="off"
      iconPosition="left"
      icon="search"
      placeholder="Search for anything"
      value={searchState.query}
      onChange={(e, { value }) => onSearchTermChange(value)}
    />
  );
};
