import { Outlet } from "react-router-dom";
import HomeHeader from "@/widgets/Header/Header/HomeHeader/HomeHeader";
import styles from "./HomeLayout.module.scss";

export default function HomeLayout() {
  return (
    <div className={styles.layout}>
      <HomeHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}