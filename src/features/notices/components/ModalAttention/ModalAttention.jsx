import { useEffect } from "react";
import AuthNav from "@/widgets/Header/AuthNav/AuthNav";
import styles from "./ModalAttention.module.scss";
import { IoClose } from "react-icons/io5";
import dog from "@/assets/images/dog.png";

const ModalAttention = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    // Lock scroll
    document.body.style.overflow = "hidden";

    // Close on ESC
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = ""; // restore scroll
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalAttention}
      onClick={onClose}
    >
      <div
        className={styles.modalAttention__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalAttention__img}>
          <img src={dog} alt="Dog" />
        </div>

        <h3 className={styles.modalAttention__title}>
          Attention
        </h3>

        <p className={styles.modalAttention__text}>
          We would like to remind you that certain functionality
          is available only to authorized users. If you have an
          account, please log in with your credentials. If you do
          not already have an account, you must register to access
          these features.
        </p>

        <AuthNav className={styles.customNav} />

        <button
          className={styles.modalAttention__close}
          onClick={onClose}
          aria-label="Close modal"
        >
          <IoClose size={24} color="#262626"/>
        </button>
      </div>
    </div>
  );
};

export default ModalAttention;