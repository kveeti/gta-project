import { Input } from "semantic-ui-react";

import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  return (
    <Input
      className={styles.searchBar}
      type="search"
      autocomplete="off"
      iconPosition="left"
      icon="search"
      placeholder="Search for anything"
    />
  );
};
