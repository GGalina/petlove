import PetBlock from "@/shared/components/PetBlock/PetBlock";
import Title from "@/shared/components/Title/Title";
import LoginForm from "@/features/auth/components/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import { Link } from "react-router-dom";

import mobileImg from "@/assets/images/login-mob.jpg";
import tabletImg from "@/assets/images/login-tablet.jpg";
import desktopImg from "@/assets/images/login-desk.jpg";

export default function LoginPage() {
  return (
    <div className={styles.login}>
      <div className={styles.login__media}>
        <PetBlock
          mobileSrc={mobileImg}
          tabletSrc={tabletImg}
          desktopSrc={desktopImg}
          alt="Pet dog"
        />
      </div>

      <div className={styles.login__content}>
        <Title
          text="Log in"
          description="Welcome! Please enter your credentials to login to the platform."
        />

        <LoginForm />

        <p className={styles.login__footer}>
          Don’t have an account?{" "}
          <Link to="/register" className={styles.login__footerlink}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}