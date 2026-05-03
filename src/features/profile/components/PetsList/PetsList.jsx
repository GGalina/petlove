import PetsItem from "../PetsItem/PetsItem";
import styles from "./PetsList.module.scss";

export default function PetsList({ pets }) {
  if (!pets.length) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {pets.map((pet) => (
        <PetsItem key={pet._id} pet={pet} />
      ))}
    </ul>
  );
}