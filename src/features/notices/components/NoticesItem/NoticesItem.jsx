import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import ModalAttention from "@/features/notices/components/ModalAttention/ModalAttention";
import ModalNotice from "@/features/notices/components/ModalNotice/ModalNotice";
import { fetchNoticeById } from "@/features/notices/api/noticesApi";
import { addFavoriteThunk, removeFavoriteThunk } from "@/store/favoritesSlice";
import { FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import styles from "./NoticesItem.module.scss";

const NoticesItem = ({ notice }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isModalAttentionOpen, setIsModalAttentionOpen] = useState(false);
  const [isModalNoticeOpen, setIsModalNoticeOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const isFavorite = favoriteIds.includes(notice._id);

  const isAuth = Boolean(token);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB").replace(/\//g, ".");
  };

  const handleLearnMore = async () => {
    if (!isAuth) {
      setIsModalAttentionOpen(true);
      return;
    }

    try {
      const noticeData = await fetchNoticeById(notice._id);
      setSelectedNotice(noticeData);
      setIsModalNoticeOpen(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleFavoriteClick = () => {
    if (!isAuth) {
      setIsModalAttentionOpen(true);
      return;
    }
    if (isFavorite) {
      dispatch(removeFavoriteThunk(notice._id));
      toast.success("Pet removed from favorites");
    } else {
      dispatch(addFavoriteThunk(notice._id));
      toast.success("Pet added to favorites");
    }
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
          <h3 className={styles.noticeItem__title}>{notice.title}</h3>
          <div className={styles.noticeItem__popularityWrapper}>
            <FaStar size={16} color="#F6B83D" />
            <p className={styles.noticeItem__popularity}>{notice.popularity}</p>
          </div>
        </div>

        <div className={styles.noticeItem__infoWrapper}>
          {["name", "birthday", "sex", "species", "category"].map((field) => (
            <div className={styles.noticeItem__infoContainer} key={field}>
              <p className={styles.noticeItem__infoLabel}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </p>
              <p className={styles.noticeItem__infoValue}>
                {field === "birthday"
                  ? formatDate(notice[field])
                  : notice[field]}
              </p>
            </div>
          ))}
        </div>

        {notice.comment && (
          <p className={styles.noticeItem__comment}>{notice.comment}</p>
        )}

        {notice.price && <p className={styles.noticeItem__price}>${notice.price}</p>}

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
            {isFavorite ? (
              <FaHeart size={18} color="#F6B83D" />
            ) : (
              <FaRegHeart size={18} color="#F6B83D" />
            )}
          </button>
        </div>
      </div>

      {/* Modal for non-auth users */}
      <ModalAttention
        isOpen={isModalAttentionOpen}
        onClose={() => setIsModalAttentionOpen(false)}
      />

      {/* Modal only for logged-in users with fetched notice */}
      {isAuth && selectedNotice && (
        <ModalNotice
          isOpen={isModalNoticeOpen}
          onClose={() => setIsModalNoticeOpen(false)}
          notice={selectedNotice}
        />
      )}
    </>
  );
};

export default NoticesItem;