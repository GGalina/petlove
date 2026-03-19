import { NavLink } from "react-router-dom";
import styles from "./UserNav.module.scss";

export default function UserNav() {
  return (
    <nav className={styles.usernav}>
      <NavLink to="/login" className={styles.usernav__login}>Log in</NavLink>
      <NavLink to="/register" className={styles.usernav__register}>Registration</NavLink>
    </nav>
  );
}