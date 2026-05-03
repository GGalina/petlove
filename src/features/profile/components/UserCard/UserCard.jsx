import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import styles from "./UserCard.module.scss";

export default function UserCard() {
  return (
    <div className={styles.userCard}>
      <UserBlock />
      <PetsBlock />
      <LogOutBtn />
    </div>
  );
}