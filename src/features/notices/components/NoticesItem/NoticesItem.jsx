import { useState } from "react";
import ModalAttention from "@/features/notices/components/ModalAttention/ModalAttention";
import ModalNotice from "@/features/notices/components/ModalNotice/ModalNotice";
import { FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import styles from "./NoticesItem.module.scss";

const NoticesItem = ({ notice }) => {
  const [isModalAttentionOpen, setIsModalAttentionOpen] = useState(false);
  const [isModalNoticeOpen, setIsModalNoticeOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const isAuth = false; // replace later with auth state

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB").replace(/\//g, ".");
  };

  const handleLearnMore = () => {
    if (!isAuth) {
      setIsModalAttentionOpen(true);
      return;
    }

    setIsModalNoticeOpen(true);
  };

  const handleFavoriteClick = () => {
    if (!isAuth) {
      setIsModalAttentionOpen(true);
      return;
    }

    setIsFavorite((prev) => !prev);
  };

  return (
    <>
      <div className={styles.noticeItem}>
        <img
          className={styles.noticeItem__image}
          src={notice.imgURL}
          alt={notice.title}
        />
        <div className={styles.noticeItem__titleWrapper}>
          <h3 className={styles.noticeItem__title}>
            {notice.title}
          </h3>
          <div className={styles.noticeItem__popularityWrapper}>
            <FaStar size={16} color="#F6B83D" />
            <p className={styles.noticeItem__popularity}>
              {notice.popularity}
            </p>
          </div>
        </div>

        <div className={styles.noticeItem__infoWrapper}>
          <div className={styles.noticeItem__infoContainer}>
            <p className={styles.noticeItem__infoLabel}>Name</p>
            <p className={styles.noticeItem__infoValue}>{notice.name}</p>
          </div>

          <div className={styles.noticeItem__infoContainer}>
            <p className={styles.noticeItem__infoLabel}>Birthday</p>
            <p className={styles.noticeItem__infoValue}>{formatDate(notice.birthday)}</p>
          </div>

          <div className={styles.noticeItem__infoContainer}>
            <p className={styles.noticeItem__infoLabel}>Sex</p>
            <p className={styles.noticeItem__infoValue}>{notice.sex}</p>
          </div>

          <div className={styles.noticeItem__infoContainer}>
            <p className={styles.noticeItem__infoLabel}>Species</p>
            <p className={styles.noticeItem__infoValue}>{notice.species}</p>
          </div>

          <div className={styles.noticeItem__infoContainer}>
            <p className={styles.noticeItem__infoLabel}>Category</p>
            <p className={styles.noticeItem__infoValue}>{notice.category}</p>
          </div>
        </div>

        <p className={styles.noticeItem__comment}>
          {notice.comment}
        </p>

        {notice.price && (
          <p className={styles.noticeItem__price}>
            ${notice.price}
          </p>
        )}

        <div className={styles.noticeItem__actions}>
          <button
            className={styles.noticeItem__learnMore}
            onClick={handleLearnMore}
          >
            Learn more
          </button>

          <button
            className={styles.noticeItem__favorite}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? <FaHeart size={18} color="#F6B83D" /> : <FaRegHeart size={18} color="#F6B83D" />}
          </button>
        </div>
      </div>

      <ModalAttention
        isOpen={isModalAttentionOpen}
        onClose={() =>
          setIsModalAttentionOpen(false)
        }
      />

      <ModalNotice
        isOpen={isModalNoticeOpen}
        onClose={() =>
          setIsModalNoticeOpen(false)
        }
        notice={notice}
      />
    </>
  );
};

export default NoticesItem;