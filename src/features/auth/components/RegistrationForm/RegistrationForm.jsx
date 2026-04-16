import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/features/auth/validation/registerSchema";
import { signup } from "@/features/auth/api/authApi";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/store/auth";
import { setToken } from "@/store/auth/authSlice";

import styles from "./RegistrationForm.module.scss";

import EyeIcon from "@/assets/icons/eye.svg?react";
import EyeOffIcon from "@/assets/icons/eye-off.svg?react";
import CheckIcon from "@/assets/icons/check.svg?react";
import CrossIcon from "@/assets/icons/cross.svg?react";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const res = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration successful!");

      if (res?.token) {
        localStorage.setItem("token", res.token);
        dispatch(setToken(res.token));
        await dispatch(fetchCurrentUser()).unwrap();

        navigate("/profile", { replace: true });
      }

      reset();
    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.");
    }
  };

  const renderValidationIcon = (field) => {
    if (!touchedFields[field]) return null;

    return errors[field] ? (
      <CrossIcon className={styles.form__icon} />
    ) : (
      <CheckIcon className={styles.form__icon} />
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div className={styles.form__fieldWrapper}>
        <input
          type="text"
          placeholder="Name"
          className={styles.form__input}
          {...register("name")}
        />

        {renderValidationIcon("name")}

        {errors.name && (
          <p className={styles.form__fieldError}>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className={styles.form__fieldWrapper}>
        <input
          type="email"
          placeholder="Email"
          className={styles.form__input}
          {...register("email")}
        />

        {renderValidationIcon("email")}

        {errors.email && (
          <p className={styles.form__fieldError}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className={styles.form__fieldWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className={styles.form__input}
          {...register("password")}
        />

        <button
          type="button"
          className={styles.form__eye}
          onClick={() => setShowPassword((p) => !p)}
        >
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </button>

        {renderValidationIcon("password")}

        {errors.password && (
          <p className={styles.form__fieldError}>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className={styles.form__fieldWrapper}>
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          className={styles.form__input}
          {...register("confirmPassword")}
        />

        <button
          type="button"
          className={styles.form__eye}
          onClick={() => setShowConfirm((p) => !p)}
        >
          {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
        </button>

        {renderValidationIcon("confirmPassword")}

        {errors.confirmPassword && (
          <p className={styles.form__fieldError}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button type="submit" className={styles.form__btn}>
        Registration
      </button>
    </form>
  );
}