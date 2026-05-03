import Icon from "@/shared/components/Icon/Icon";
import styles from "./EditUserBtn.module.scss";

export default function EditUserBtn({ onClick }) {
  return (
    <button className={styles.editBtn} onClick={onClick}>
      <Icon name="icon-edit-user" width={18} height={18} />
    </button>
  );
}