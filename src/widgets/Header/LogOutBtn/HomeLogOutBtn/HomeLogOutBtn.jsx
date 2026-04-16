import { useState } from 'react';
import ModalApproveAction from '@/widgets/Header/ModalApproveAction/ModalApproveAction';
import styles from './HomeLogOutBtn.module.scss';

export default function HomeLogOutBtn () {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.logout}>
      <button
        className={styles.logout__btn}
        onClick={() => setIsOpen(true)}
      >
        Log out
      </button>

      {isOpen && (
        <ModalApproveAction
          onClose={() => setIsOpen(false)}
          actionType="logout"
        />
      )}
    </div>
  );
};