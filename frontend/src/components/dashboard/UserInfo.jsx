import styles from '../../styles/UserInfo.module.css';
import { FaMicrophone, FaHeadphones, FaCog } from 'react-icons/fa';

function UserInfo() {
  return (
    <div className={styles.userInfo}>
      <img src="https://via.placeholder.com/32" alt="Avatar" className={styles.avatar} />
      <div className={styles.nameTag}>
        <span className={styles.username}>YourName</span>
        <span className={styles.tag}>#1234</span>
      </div>
      <div className={styles.actions}>
        <FaMicrophone className={styles.icon} />
        <FaHeadphones className={styles.icon} />
        <FaCog className={styles.icon} />
      </div>
    </div>
  );
}

export default UserInfo;