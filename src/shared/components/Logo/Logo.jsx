import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <span className={styles.logo__text}>petl</span>
        <FaHeart className={styles.logo__heart} />
      <span className={styles.logo__text}>ve</span>
    </Link>
  );
}