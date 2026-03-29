import styles from "./FriendsItem.module.scss";

const getWorkingHours = (workDays) => {
  if (!Array.isArray(workDays) || workDays.length === 0) return "Day and night";

  const openDay = workDays.find((day) => day.isOpen && day.from && day.to);
  if (!openDay) return "Day and night";

  return `${openDay.from} - ${openDay.to}`;
};

// Plain text messages, your original ones
const getEmailContent = (email, phone) => {
  if (email) return email;
  if (phone) return "phone only";
  return "website only";
};

const getPhoneContent = (phone, email) => {
  if (phone) return phone;
  if (email) return "email only";
  return "website only";
};

const getAddressContent = (address) => {
  if (address) return address;
  return "website only";
};

const FriendsItem = ({ friend }) => {
  const { title, imageUrl, address, phone, email, url, workDays } = friend;
  const workingHours = getWorkingHours(workDays);

  return (
    <div className={styles.friendsItem}>
      <div className={styles.friendsItem__logoWrapper}>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.friendsItem_logoLink}>
          <img src={imageUrl} alt={title} className={styles.friendsItem__logo} />
        </a>
      </div>

      <div className={styles.friendsItem__wrapper}>
        <h3 className={styles.friendsItem__companyName}>{title}</h3>

        <p className={styles.friendsItem__info}>
          <span className={styles.friendsItem__miniTitle}>Email: </span>
          {getEmailContent(email, phone)}
        </p>

        <p className={styles.friendsItem__info}>
          <span className={styles.friendsItem__miniTitle}>Address: </span>
          {getAddressContent(address)}
        </p>

        <p className={styles.friendsItem__info}>
          <span className={styles.friendsItem__miniTitle}>Phone: </span>
          {getPhoneContent(phone, email)}
        </p>
      </div>

      <div className={styles.friendsItem__hoursContainer}>
        <p className={styles.friendsItem__hours}>{workingHours}</p>
      </div>
    </div>
  );
};

export default FriendsItem;