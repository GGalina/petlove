import FriendsItem from "@/features/friends/components/FriendsItem/FriendsItem";
import styles from "./FriendsList.module.scss";

const FriendsList = ({ friends }) => {
    return (
        <div className={styles.friendsList}>
            {friends.map((friend) => (
                <FriendsItem key={friend._id} friend={friend} />
            ))}
        </div>
    );
};

export default FriendsList;