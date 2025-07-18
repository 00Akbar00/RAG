import styles from '../../styles/ServerList.module.css';
import { FaPlus } from 'react-icons/fa';

function AddServerIcon({ onClick }) {
  return (
    <div className={`${styles.serverIconWrapper}`} onClick={onClick}>
      <div className={styles.pill}></div>
      <div className={styles.serverIcon} style={{ backgroundColor: '#3ca374' }}>
        <FaPlus color="white" />
      </div>
    </div>
  );
}

export default AddServerIcon;