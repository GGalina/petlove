import { useState } from "react";
import ModalApproveAction from "@/widgets/Header/ModalApproveAction/ModalApproveAction";
import styles from "./LogOutBtn.module.scss";

export default function LogOutBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className={styles.logOutBtn} onClick={openModal}>
        Log out
      </button>

      {isOpen && (
        <ModalApproveAction onClose={closeModal} />
      )}
    </>
  );
}