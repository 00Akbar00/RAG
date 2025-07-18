import styles from '../../styles/ServerList.module.css';
import AddServerIcon from './AddServerIcon';

function ServerList({ servers, activeServer, setActiveServer, onAddServerClick }) {
  return (
    <div className={styles.serverList}>
      {/* Direct Message Icon */}
      <div className={`${styles.serverIconWrapper} ${'dm' === activeServer ? styles.active : ''}`} onClick={() => setActiveServer('dm')}>
         <div className={styles.pill}></div>
         <div className={styles.serverIcon} style={{ backgroundColor: '#5865F2' }}>DM</div>
      </div>
      
      <div className={styles.separator}></div>

      {servers.map(server => (
        <div 
          key={server.id} 
          className={`${styles.serverIconWrapper} ${server.id === activeServer ? styles.active : ''}`}
          onClick={() => setActiveServer(server.id)}
          title={server.name}
        >
          <div className={styles.pill}></div>
          <img src={server.imageUrl} alt={server.name} className={styles.serverIcon} />
        </div>
      ))}
      
      <AddServerIcon onClick={onAddServerClick} />
    </div>
  );
}

export default ServerList;