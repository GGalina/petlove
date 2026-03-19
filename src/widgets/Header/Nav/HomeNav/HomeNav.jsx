import { NavLink } from "react-router-dom";
import styles from "./HomeNav.module.scss";

export default function Nav() {
  return (
    <nav  className={styles.nav}>
      <NavLink to="/news" className={styles.nav__link}>News</NavLink>
      <NavLink to="/notices" className={styles.nav__link}>Find pet</NavLink>
      <NavLink to="/friends" className={styles.nav__link}>Our friends</NavLink>
    </nav>
  );
}