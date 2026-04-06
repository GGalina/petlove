import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart, FaStar } from "react-icons/fa6";
import {
  addFavoriteThunk,
  removeFavoriteThunk,
} from "@/store/favoritesSlice";
import styles from "./ModalNotice.module.scss";

const ModalNotice = ({ isOpen, onClose, notice }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const isLoading = useSelector((state) => state.favorites.loading);
  const isFavorite = favoriteIds.includes(notice._id);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !notice) return null;

  const handleFavoriteClick = () => {
    if (isLoading) return;

    if (isFavorite) {
      dispatch(removeFavoriteThunk(notice._id));
    } else {
      dispatch(addFavoriteThunk(notice._id));
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date)
      .toLocaleDateString("en-GB")
      .replace(/\//g, ".");
  };

  const filledStars = Math.min(notice.popularity || 0, 5);

  return (
    <div className={styles.modalNotice} onClick={onClose}>
      <div
        className={styles.modalNotice__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalNotice__img}>
          <img
            className={styles.modalNotice__imgUrl}
            src={notice.imgURL}
            alt={notice.title}
          />
          <p className={styles.modalNotice__category}>
            {notice.category}
          </p>
        </div>

        <h3 className={styles.modalNotice__title}>
          {notice.title}
        </h3>

        <div className={styles.modalNotice__stars}>
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              size={16}
              color={
                index < filledStars
                  ? "#F6B83D"
                  : "#D9D9D9"
              }
            />
          ))}

          <span className={styles.modalNotice__starsValue}>
            {notice.popularity}
          </span>
        </div>

        <div className={styles.modalNotice__infoWrapper}>
          {["name", "birthday", "sex", "species"].map(
            (field) => (
              <div
                className={styles.modalNotice__infoContainer}
                key={field}
              >
                <p className={styles.modalNotice__infoLabel}>
                  {field.charAt(0).toUpperCase() +
                    field.slice(1)}
                </p>

                <p className={styles.modalNotice__infoValue}>
                  {field === "birthday"
                    ? formatDate(notice[field])
                    : notice[field]}
                </p>
              </div>
            )
          )}
        </div>

        <p className={styles.modalNotice__comment}>
          {notice.comment}
        </p>

        {notice.price && notice.price !== 0 && (
          <p className={styles.modalNotice__price}>
            ${notice.price}
          </p>
        )}

        <div className={styles.modalNotice__favWrapper}>
          <button
            className={styles.modalNotice__favorite}
            onClick={handleFavoriteClick}
            disabled={isLoading}
          >
            {isFavorite ? (
              <>
                Remove from{" "}
                <FaHeart size={18} color="#FFFFFF" />
              </>
            ) : (
              <>
                Add to{" "}
                <FaRegHeart size={18} color="#FFFFFF" />
              </>
            )}
          </button>

          {notice.user?.email ? (
            <a
              className={styles.modalNotice__contact}
              href={`mailto:${notice.user.email}`}
            >
              Contact
            </a>
          ) : notice.user?.phone ? (
            <a
              className={styles.modalNotice__contact}
              href={`tel:${notice.user.phone}`}
            >
              Contact
            </a>
          ) : null}
        </div>

        <button
          className={styles.modalNotice__close}
          onClick={onClose}
        >
          <IoClose size={24} color="#262626" />
        </button>
      </div>
    </div>
  );
};

export default ModalNotice;