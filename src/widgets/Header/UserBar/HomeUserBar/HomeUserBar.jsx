import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import styles from "./HomeUserBar.module.scss";

export default function HomeUserBar({onLinkClick}) {
  const user = useSelector((state) => state.auth.user);

  return (
    <Link to="/profile" className={styles.userBar} onClick={onLinkClick}>
      <div className={styles.userBar__avatarWrapper}>
        {user?.avatar ? (
            <img
            src={user.avatar}
            alt={user?.name || "User"}
            className={styles.userBar__avatar}
            />
        ) : (
            <FaUser size={20} className={styles.userBar__icon} />
        )}
        </div>

      <span className={styles.userBar__name}>{user?.name}</span>
    </Link>
  );
}