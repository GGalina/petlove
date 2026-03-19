import HomeBanner from "@/assets/images/home.jpg";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles.home__topcontainer}>
        <h1 className={styles.home__title}>Take good 
          <span className={styles.home__accent}> care </span> 
          of your small pets</h1>
        <p className={styles.home__desc}>Choosing a pet for your home is 
          a choice that is meant to enrich your life with 
          immeasurable joy and tenderness.
        </p>
      </div>
      <div className={styles.home__bottomcontainer}>
        <img 
            src={HomeBanner}
            alt="Pet illustration" 
            className={styles.home__image} 
          />
      </div>
    </div>
  );
}