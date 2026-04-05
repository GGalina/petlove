import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.scss";

export default function AuthNav({onLinkClick, className = ""}) {
  return (
    <nav className={`${styles.authnav} ${className}`}>
      <NavLink to="/login" className={styles.authnav__login} onClick={onLinkClick}>Log in</NavLink>
      <NavLink to="/register" className={styles.authnav__register} onClick={onLinkClick}>Registration</NavLink>
    </nav>
  );
}