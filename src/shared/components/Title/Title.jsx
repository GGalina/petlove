import styles from "./Title.module.scss";

export default function Title({ 
  text, 
  accentText, 
  description, 
  className = "" 
}) {
  return (
    <div className={`${styles.title__container} ${className}`}>
      <h1 className={styles.title}>
        {text}{" "}
        {accentText && <span className={styles.title__accent}>{accentText}</span>}
      </h1>
      {description && <p className={styles.title__desc}>{description}</p>}
    </div>
  );
}