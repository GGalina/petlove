import styles from "./NewsItem.module.scss";

const NewsItem = ({ item }) => {
  const { imgUrl, title, text, date, url } = item;

  const formattedDate = new Date(date).toLocaleDateString("en-GB");

  return (
    <article className={styles.newsItem}>
      <img src={imgUrl} alt={title} className={styles.newsItem__image} />

      <div className={styles.newsItem__content}>
        <h3 className={styles.newsItem__title}>{title}</h3>
        <p className={styles.newsItem__text}>{text}</p>

        <div className={styles.newsItem__footer}>
          <span className={styles.newsItem__date}>{formattedDate}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.newsItem__link}
          >
            Read more
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsItem;