import { useSelector } from "react-redux";
import { selectPets } from "@/store/auth/authSelectors";
import AddPet from "../AddPet/AddPet";
import PetsList from "../PetsList/PetsList";
import styles from "./PetsBlock.module.scss";

export default function PetsBlock() {
  const pets = useSelector(selectPets);

  return (
    <div className={styles.petBlock}>
      <div className={styles.petBlock__header}>
        <h3 className={styles.petBlock__title}>My pets</h3>
        <AddPet />
      </div>

      <PetsList pets={pets} />
    </div>
  );
}