import { NavLink } from "react-router-dom";
import styles from "./HomeAuthNav.module.scss";

export default function AuthNav({onLinkClick}) {
  return (
    <nav className={styles.authnav}>
      <NavLink to="/login" className={styles.authnav__login} onClick={onLinkClick}>Log in</NavLink>
      <NavLink to="/register" className={styles.authnav__register} onClick={onLinkClick}>
        Registration
      </NavLink>
    </nav>
  );
}