import styles from "./Logo.module.scss";
import { FaHeart } from "react-icons/fa";

export default function HomeLogo() {
  return (
    <div className={styles.logo}>
      <span className={styles.logo__text}>petl</span>
      <FaHeart className={styles.logo__heart}/>
      <span className={styles.logo__text}>ve</span>
    </div>
  );
};