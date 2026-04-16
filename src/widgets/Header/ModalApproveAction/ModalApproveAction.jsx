import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { logoutUser } from "@/store/auth/authOperations";
import catImg from "@/assets/images/catlogout.png";
import styles from "./ModalApproveAction.module.scss";

export default function ModalApproveAction({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = useCallback(() => {
    if (!isLoading) {
      onClose();
    }
  }, [onClose, isLoading]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleApprove = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await dispatch(logoutUser()).unwrap();
      navigate("/", { replace: true });
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={styles.approveModal}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
    >
      <div className={styles.approveModal__content}>
        <button
          type="button"
          className={styles.approveModal__close}
          onClick={handleClose}
          aria-label="Close modal"
        >
          <IoClose size={24} />
        </button>

        <div className={styles.approveModal__imgWrapper}>
          <img
            src={catImg}
            alt="Logout illustration"
            className={styles.approveModal__img}
          />
        </div>

        <h2
          id="logout-title"
          className={styles.approveModal__title}
        >
          Already leaving?
        </h2>

        <div className={styles.approveModal__btnWrapper}>
          <button
            type="button"
            className={styles.approveModal__confirmBtn}
            onClick={handleApprove}
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Yes"}
          </button>

          <button
            type="button"
            className={styles.approveModal__cancelBtn}
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}