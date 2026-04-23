import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
import Icon from "@/shared/components/Icon/Icon";
import { addPetSchema } from "@/features/pets/validation/addPetSchema";
import { fetchPetTypes } from "@/features/notices/api/noticesApi";
import { addPet } from "@/features/pets/api/petsApi";
import { updateUser } from "@/store/auth/authSlice";
import { uploadImageToCloudinary } from "@/features/pets/api/uploadImage";
import styles from "./AddPetForm.module.scss";


// FORMAT FOR BACKEND YYYY-MM-DD
const formatToISO = (date) => {
  if (!date) return "";

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();

  return `${y}-${m}-${d}`;
};

export default function AddPetForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(null);
  const [petTypes, setPetTypes] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addPetSchema),
    defaultValues: {
      species: "",
      birthday: null,
      imgUrl: "",
      sex: "",
    },
  });

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const data = await fetchPetTypes();
        setPetTypes(data.map((p) => ({ value: p, label: p })));
      } catch (e) {
        console.error(e);
      }
    };

    loadTypes();
  }, []);

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setValue("imgUrl", value, { shouldValidate: true });
    setPreview(value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      const uploadedUrl = await uploadImageToCloudinary(file);

      setPreview(uploadedUrl);

      setValue("imgUrl", uploadedUrl, { shouldValidate: true });
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        title: data.title,
        imgURL: data.imgUrl,
        species: data.species,
        sex: data.sex,
        birthday: formatToISO(data.birthday),
      };

      const updatedUser = await addPet(payload);

      dispatch(updateUser(updatedUser));
      navigate("/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* TITLE */}
      <h2 className={styles.form__title}>
        Add my pet /{" "}
        <span className={styles.form__subTitle}>Personal details</span>
      </h2>

      {/* SEX */}
      <div className={styles.form__sex}>
        <label className={styles.form__sexItem}>
          <input type="radio" value="female" {...register("sex")} />
          <span className={`${styles.form__circle} ${styles["form__circle--female"]}`}>
            <Icon name="icon-female" width={20} height={20} />
          </span>
        </label>

        <label className={styles.form__sexItem}>
          <input type="radio" value="male" {...register("sex")} />
          <span className={`${styles.form__circle} ${styles["form__circle--male"]}`}>
            <Icon name="icon-male" width={20} height={20} />
          </span>
        </label>

        <label className={styles.form__sexItem}>
          <input type="radio" value="other" {...register("sex")} />
          <span className={`${styles.form__circle} ${styles["form__circle--other"]}`}>
            <Icon name="icon-male-alt" width={20} height={20} />
          </span>
        </label>
      </div>

      {errors.sex && <p className={styles.form__error}>{errors.sex.message}</p>}

      {/* IMAGE PREVIEW */}
      <div className={styles.form__imageWrapper}>
        <div className={styles.form__image}>
          {preview ? (
            <img src={preview} alt="pet" />
          ) : (
            <div className={styles.form__placeholder}>
              <Icon name="icon-paw" width={34} height={34} />
            </div>
          )}
        </div>
      </div>

      {/* IMAGE INPUT */}
      <div className={styles.form__imageUrl}>
        <input
          placeholder="Enter URL"
          {...register("imgUrl")}
          onChange={handleUrlChange}
        />

        <label className={styles.form__upload}>
          <span className={styles.form__uploadText}>Upload photo</span>
          <Icon name="icon-upload-cloud" width={16} height={16} />
          <input type="file" accept="image/*" onChange={handleFileChange} hidden />
        </label>
      </div>

      {errors.imgUrl && (
        <p className={styles.form__error}>{errors.imgUrl.message}</p>
      )}

      {/* TITLE */}
      <input className={styles.form__input} placeholder="Title" {...register("title")} />
      {errors.title && <p className={styles.form__error}>{errors.title.message}</p>}

      {/* NAME */}
      <input className={styles.form__input} placeholder="Pet name" {...register("name")} />
      {errors.name && <p className={styles.form__error}>{errors.name.message}</p>}

      {/* ROW */}
      <div className={styles.form__row}>
        {/* DATE */}
        <div className={styles.form__dateWrapper}>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="00.00.0000"
                  dateFormat="dd.MM.yyyy"
                  className={styles.form__datePicker}
                />
                <FiCalendar className={styles.form__dateIcon} />
              </>
            )}
          />
        </div>

        {/* TYPE */}
        <Controller
          name="species"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={petTypes}
              className={styles.form__select}
              classNamePrefix="select"
              placeholder="Type"
              isClearable
              onChange={(opt) => field.onChange(opt?.value || "")}
              value={petTypes.find((o) => o.value === field.value) || null}
            />
          )}
        />
      </div>

      {(errors.birthday || errors.species) && (
        <p className={styles.form__error}>
          {errors.birthday?.message || errors.species?.message}
        </p>
      )}

      {/* BUTTONS */}
      <div className={styles.form__buttons}>
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className={styles.form__backBtn}
        >
          Back
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.form__submitBtn}
        >
          Submit
        </button>
      </div>
    </form>
  );
}