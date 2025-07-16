import styles from '../../styles/ServerList.module.css';

function ServerList({ servers, activeServer, setActiveServer }) {
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
    </div>
  );
}

export default ServerList;