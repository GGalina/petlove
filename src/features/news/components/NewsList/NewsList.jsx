import NewsItem from "../NewsItem/NewsItem";
import styles from "./NewsList.module.scss";

const NewsList = ({ items = [] }) => {
  if (!items.length) {
    return <p className={styles.newsList__empty}>No news found</p>;
  }

  return (
    <div className={styles.newsList}>
      {items.map((item) => (
        <NewsItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default NewsList;