import styles from "./Header.module.scss";

import HomeLogo from "@/shared/components/Logo/HomeLogo/HomeLogo";
import HomePageNav from "../HomePageNav/HomePageNav";

export default function Header() {
  return (
    <header className={styles.header}>
      <HomeLogo />
      <HomePageNav />
    </header>
  );
}