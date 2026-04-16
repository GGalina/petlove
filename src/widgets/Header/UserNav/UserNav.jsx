import UserBar from '@/widgets/Header/UserBar/UserBar';
import LogOutBtn from '@/widgets/Header/LogOutBtn/LogOutBtn';
import styles from './UserNav.module.scss';

export default function UserNav ({onLinkClick}) {
  return (
    <div className={styles.userNav}>
      <UserBar onLinkClick={onLinkClick}/>
      <LogOutBtn />
    </div>
  );
};

