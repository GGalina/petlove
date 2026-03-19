import PetBlock from "@/shared/components/PetBlock/PetBlock";
import Title from "@/shared/components/Title/Title";
import styles from "./RegisterPage.module.scss";
import { Link } from "react-router-dom";



export default function RegisterPage() {
  return (
    <div className={styles.register}>
      {/* Left / Top */}
      <div className={styles.register__media}>
        <PetBlock
          mobileSrc={mobileImg}
          tabletSrc={tabletImg}
          desktopSrc={desktopImg}
          alt="Pet"
        />
      </div>

      {/* Right / Bottom */}
      <div className={styles.register__content}>
        <Title
          text="Create your"
          accentText="account"
          description="Join PetLove and take the best care of your pets."
        />

        <form className={styles.register__form}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />

          <button type="submit">Register</button>
        </form>

        <p className={styles.register__footer}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}