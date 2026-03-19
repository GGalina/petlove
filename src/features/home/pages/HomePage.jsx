import Logo from "@/shared/components/Logo/Logo";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <header>
      <Logo className={styles.logoMain} />
    </header>
  );
}