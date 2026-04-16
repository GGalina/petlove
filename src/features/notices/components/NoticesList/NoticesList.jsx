import NoticesItem from "@/features/notices/components/NoticesItem/NoticesItem";
import styles from "./NoticesList.module.scss";

const NoticesList = ({ notices, favoriteIds = [], isLoggedIn }) => {
  if (!notices || notices.length === 0) {
    return <p className={styles.noResults}>No animals found.</p>;
  }

  return (
    <div className={styles.noticeList}>
      {notices.map((notice) => {
        const isFavorite = favoriteIds.includes(notice._id);

        return (
          <NoticesItem
            key={notice._id}
            notice={notice}
            isFavorite={isFavorite}
            isLoggedIn={isLoggedIn}
          />
        );
      })}
    </div>
  );
};

export default NoticesList;