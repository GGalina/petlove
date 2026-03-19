import styles from "./PetBlock.module.scss";

export default function PetBlock({ src, alt = "", className = "" }) {
  return (
    <div className={`${styles.imageBlock} ${className}`}>
      <picture>
        {/* Desktop */}
        <source media="(min-width: 1280px)" srcSet={desktopSrc} />
        
        {/* Tablet */}
        <source media="(min-width: 768px)" srcSet={tabletSrc} />
        
        {/* Mobile (default) */}
        <img
          src={mobileSrc}
          alt={alt}
          className={styles.imageBlock__image}
        />
      </picture>
    </div>
  );
}