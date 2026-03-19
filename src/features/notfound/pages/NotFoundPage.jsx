import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";
import NotFoundImage from "@/assets/images/404.png";

export default function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__container404}>
        <p className={styles.notFound__number}>4</p>
        <img
          src={NotFoundImage}
          alt="Page not found"
          className={styles.notFound__image}
        />
        <p className={styles.notFound__number}>4</p>
      </div>
      
      <h1 className={styles.notFound__title}>Ooops! This page not found <code>:)</code></h1>
      <Link to="/" className={styles.notFound__link}>To home page</Link>
    </div>
  );
}