import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/features/auth/validation/loginSchema";
import { login } from "@/features/auth/api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/authSlice";

import styles from "./LoginForm.module.scss";

import EyeIcon from "@/assets/icons/eye.svg?react";
import EyeOffIcon from "@/assets/icons/eye-off.svg?react";
import CheckIcon from "@/assets/icons/check.svg?react";
import CrossIcon from "@/assets/icons/cross.svg?react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const values = watch();

  const onSubmit = async (data) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      });

      toast.success("Login successful!");

      if (res?.token) {
        // Save token and user in Redux (also saved to localStorage by your slice)
        dispatch(
          setAuth({
            token: res.token,
            user: { email: res.email, name: res.name },
          })
        );

        // Always redirect to profile
        navigate("/profile", { replace: true });
      }

      reset();
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
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
          <p className={styles.form__fieldError}>{errors.email.message}</p>
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
          <p className={styles.form__fieldError}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className={styles.form__btn}>
        Log in
      </button>
    </form>
  );
}