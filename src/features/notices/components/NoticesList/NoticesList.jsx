import NoticesItem from "@/features/notices/components/NoticesItem/NoticesItem";
import styles from "./NoticesList.module.scss";

const NoticesList = ({ notices }) => {
  if (!notices || notices.length === 0) {
    return <p className={styles.noResults}>No animals found.</p>;
  }

  return (
    <div className={styles.noticeList}>
      {notices.map((notice) => (
        <NoticesItem key={notice._id} notice={notice} />
      ))}
    </div>
  );
};

export default NoticesList;