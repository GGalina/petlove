
import AddPetForm from "../components/AddPetForm";
import styles from "./AddPetPage.module.scss";

export default function AddPetPage() {
  return (
    <section className={styles.addPetPage}>
      <AddPetForm />
    </section>
  );
}