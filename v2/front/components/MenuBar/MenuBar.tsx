import { SearchBar } from "./SearchBar";

import styles from "./MenuBar.module.css";
import Profile from "./Profile/Profile";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const MenuBar = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/search?q=s");
  }, []);

  return (
    <nav className={styles.navBar}>
      <div className={styles.nav}>
        <SearchBar />
        <Profile />
      </div>
    </nav>
  );
};
