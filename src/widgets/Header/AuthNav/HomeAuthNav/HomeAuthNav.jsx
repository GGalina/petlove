import { NavLink } from "react-router-dom";
import styles from "./HomeAuthNav.module.scss";

export default function AuthNav() {
  return (
    <nav className={styles.authnav}>
      <NavLink to="/login" className={styles.authnav__login}>Log in</NavLink>
      <NavLink to="/register" className={styles.authnav__register}>Registration</NavLink>
    </nav>
  );
}