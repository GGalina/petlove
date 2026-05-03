import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth/authSelectors";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import Icon from "@/shared/components/Icon/Icon";
import styles from "./UserBlock.module.scss";

export default function UserBlock() {
  const user = useSelector(selectUser);

  if (!user) return null;

  return (
    <div className={styles.userBlock}>
      {/* HEADER */}
      <div className={styles.userBlock__header}>
        <div className={styles.userBlock__user}>
          <span>{user.name}</span>
          <Icon name="icon-user" width={18} height={18}/>
        </div>
        <EditUserBtn />
      </div>

      {/* AVATAR */}
      <div className={styles.userBlock__avatarWrapper}>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className={styles.userBlock__avatar}
          />
        ) : (
          <div className={styles.userBlock__avatarFallback}>
            <div className={styles.userBlock__avatarFallbackWrapper}>
              <Icon name="icon-user" width={40} height={40}/>
            </div>
            <span className={styles.userBlock__uploadLink}>Upload photo </span>
          </div>
        )}
      </div>

      {/* INFO */}
      <h3 className={styles.userBlock__title}>My information</h3>

      <div className={styles.userBlock__fields}>
        <div className={styles.userBlock__field}>{user.name}</div>
        <div className={styles.userBlock__field}>{user.email}</div>
        {user.phone ? (
          <div className={styles.userBlock__field}>{user.phone}</div>
        ) : (
          <div className={styles.userBlock__fieldEmpty}>+380</div>
        )}
      </div>
    </div>
  );
}