import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/news">News</NavLink>
      <NavLink to="/notices">Notices</NavLink>
      <NavLink to="/friends">Friends</NavLink>
    </nav>
  );
}