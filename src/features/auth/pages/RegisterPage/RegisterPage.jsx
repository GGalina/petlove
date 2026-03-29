import PetBlock from "@/shared/components/PetBlock/PetBlock";
import Title from "@/shared/components/Title/Title";
import RegistrationForm from "@/features/auth/components/RegistrationForm/RegistrationForm";
import styles from "./RegisterPage.module.scss";
import { Link } from "react-router-dom";

import mobileImg from "@/assets/images/register-mob.jpg";
import tabletImg from "@/assets/images/register-tablet.jpg";
import desktopImg from "@/assets/images/register-desk.jpg";

export default function RegisterPage() {
  return (
    <div className={styles.register}>
      <div className={styles.register__media}>
        <PetBlock
          mobileSrc={mobileImg}
          tabletSrc={tabletImg}
          desktopSrc={desktopImg}
          alt="Pet cat"
        />
      </div>

      <div className={styles.register__content}>
        <Title
          text="Registration"
          description="Thank you for your interest in our platform."
        />

        <RegistrationForm />

        <p className={styles.register__footer}>
          Already have an account?{" "}
          <Link to="/login" className={styles.register__footerlink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}