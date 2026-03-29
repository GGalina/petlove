import { NavLink } from "react-router-dom";
import styles from "./HomeNav.module.scss";

export default function Nav({onLinkClick }) {
  return (
    <nav  className={styles.nav}>
      <NavLink to="/news" className={styles.nav__link} onClick={onLinkClick}>News</NavLink>
      <NavLink to="/notices" className={styles.nav__link} onClick={onLinkClick}>Find pet</NavLink>
      <NavLink to="/friends" className={styles.nav__link} onClick={onLinkClick}>Our friends</NavLink>
    </nav>
  );
}