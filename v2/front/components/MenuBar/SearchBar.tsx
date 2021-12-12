import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "semantic-ui-react";
import { search } from "../../state/actions/search";
import { useISelector } from "../../state/hooks";

import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  if (typeof window === "undefined") return null;

  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const dispatch = useDispatch();
  const searchState = useISelector((state) => state.search);

  const router = useRouter();

  const onSearchTermChange = async (value: string) => {
    dispatch(search.set.input(value));
    clearTimeout(timer);

    if (!value.length) {
      dispatch(search.set.cars([]));
      dispatch(search.set.garages([]));
      return router.push("/");
    }

    router.push(`/search?q=${value}`);

    const timeout = setTimeout(() => {
      dispatch(search.search(value));
    }, 150);

    setTimer(timeout);
  };

  return (
    <Input
      className={styles.searchBar}
      type="search"
      autoComplete="off"
      iconPosition="left"
      icon="search"
      placeholder="Search for anything"
      value={searchState.input.value}
      onChange={(e, { value }) => onSearchTermChange(value)}
      autoFocus
    />
  );
};
