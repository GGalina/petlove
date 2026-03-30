import { useEffect, useState } from "react";
import Title from "@/shared/components/Title/Title";
import FriendsList from "@/features/friends/components/FriendsList/FriendsList";
import Loader from "@/shared/components/Loader/Loader";
import { getFriends } from "@/features/friends/api/friendsApi";
import styles from "./FriendsPage.module.scss";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const data = await getFriends();
        setFriends(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <section className={styles.friendsPage}>
      <Title text="Our friends" className={styles.customTitle} />
  
      {loading && <Loader />}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <FriendsList friends={friends} />
      )}
    </section>
  );
};

export default FriendsPage;