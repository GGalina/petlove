import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./AddPetForm.module.scss";

// Yup schema for validation
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Pet name is required"),
  imgUrl: yup
    .string()
    .required("Image URL is required")
    .url("Must be a valid URL")
    .matches(/\.(jpeg|jpg|gif|png|bmp|webp)$/, "Must be an image URL"),
  species: yup.string().required("Species is required"),
  birthday: yup
    .string()
    .required("Birthday is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD"),
  sex: yup.string().required("Sex is required"),
});

export default function AddPetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // TODO: send to backend via axios
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label>Title</label>
        <input {...register("title")} placeholder="Pet title" />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.field}>
        <label>Name</label>
        <input {...register("name")} placeholder="Pet name" />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <label>Image URL</label>
        <input {...register("imgUrl")} placeholder="https://..." />
        {errors.imgUrl && <p className={styles.error}>{errors.imgUrl.message}</p>}
      </div>

      <div className={styles.field}>
        <label>Species</label>
        <input {...register("species")} placeholder="Cat, Dog, etc." />
        {errors.species && <p className={styles.error}>{errors.species.message}</p>}
      </div>

      <div className={styles.field}>
        <label>Birthday</label>
        <input type="date" {...register("birthday")} />
        {errors.birthday && <p className={styles.error}>{errors.birthday.message}</p>}
      </div>

      <div className={styles.field}>
        <label>Sex</label>
        <select {...register("sex")}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.sex && <p className={styles.error}>{errors.sex.message}</p>}
      </div>

      <div className={styles.buttons}>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => reset()}>
          Back
        </button>
      </div>
    </form>
  );
}