import { Link } from "react-router-dom";
import Icon from "@/shared/components/Icon/Icon";
import styles from "./AddPet.module.scss";

export default function AddPet() {
  return (
    <Link to="/add-pet" className={styles.addPetBtn}>
      <span>Add pet</span>
      <Icon name="icon-plus" width={18} height={18} />
    </Link>
  );
}