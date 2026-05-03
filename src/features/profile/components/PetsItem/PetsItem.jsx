import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Icon from "@/shared/components/Icon/Icon";
import { deletePet } from "@/features/pets/api/petsApi";
import { setPets } from "@/store/petsSlice";
import styles from "./PetsItem.module.scss";

export default function PetsItem({ pet }) {
  const dispatch = useDispatch();

  const petFields = [
    { label: "Name", value: pet.name },
    { label: "Birthday", value: pet.birthday },
    { label: "Sex", value: pet.sex },
    { label: "Species", value: pet.species },
  ];

  const handleDelete = async () => {
    try {
      const updatedPets = await deletePet(pet._id);
      dispatch(setPets(updatedPets.pets));

      toast.success("Pet removed successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <li className={styles.petsItem}>
      {/* IMAGE */}
      <div className={styles.petsItem__imageWrapper}>
        <img
          src={pet.imgURL}
          alt={pet.title}
          className={styles.petsItem__image}
        />
      </div>

      {/* INFO */}
      <div className={styles.petsItem__info}>
        <h4 className={styles.petsItem__title}>{pet.title}</h4>

        <div className={styles.petsItem__infoWrapper}>
          {petFields.map((item) => (
            <div
              key={item.label}
              className={styles.petsItem__textWrapper}
            >
              <div className={styles.petsItem__text}>
                <span className={styles.petsItem__label}>
                  {item.label}:
                </span>

                <span className={styles.petsItem__value}>
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DELETE BUTTON */}
      <button
        type="button"
        className={styles.petsItem__deleteBtn}
        onClick={handleDelete}
      >
        <Icon
          name="icon-trash"
          width={18}
          height={18}
        />
      </button>
    </li>
  );
}