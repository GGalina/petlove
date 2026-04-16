import HomeUserBar from '@/widgets/Header/UserBar/HomeUserBar/HomeUserBar';
import HomeLogOutBtn from '@/widgets/Header/LogOutBtn/HomeLogOutBtn/HomeLogOutBtn';
import styles from './HomeUserNav.module.scss';

export default function HomeUserNav ({onLinkClick}) {
  return (
    <div className={styles.userNav}>
      <HomeUserBar onLinkClick={onLinkClick}/>
      <HomeLogOutBtn />
    </div>
  );
};

