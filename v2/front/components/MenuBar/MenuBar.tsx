import { SearchBar } from "./SearchBar";

import styles from "./MenuBar.module.css";
import Profile from "./Profile/Profile";

export const MenuBar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.menuBar}>
        <div></div>
        <SearchBar />
        <Profile />
      </div>
    </header>
  );
};
