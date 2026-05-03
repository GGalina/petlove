import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/shared/components/Loader/Loader";

import UserCard from "@/features/profile/components/UserCard/UserCard";
import MyNotices from "@/features/profile/components/MyNotices/MyNotices";

import { fetchCurrentUser } from "@/store/auth/authOperations";
import { selectUser, selectToken } from "@/store/auth/authSelectors";

import styles from "./ProfilePage.module.scss";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [token, user, dispatch]);

  if (!user) {
    return <Loader />;
  }

  return (
    <section className={styles.profilePage}>
      <UserCard />
      <MyNotices />
    </section>
  );
}