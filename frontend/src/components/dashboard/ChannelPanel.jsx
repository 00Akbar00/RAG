import styles from '../../styles/ChannelPanel.module.css';
import UserInfo from './UserInfo';
import { FaHashtag, FaVolumeUp } from 'react-icons/fa';

function ChannelPanel({ channels, activeChannel, setActiveChannel }) {
  const serverName = "My Server"; // Placeholder, can be dynamic later

  return (
    <div className={styles.channelPanel}>
      <div className={styles.serverName}>
        {serverName} <span className={styles.arrow}>&#x25BC;</span>
      </div>
      <div className={styles.channelList}>
        {channels.length > 0 ? (
          channels.map((channel, index) => {
            if (channel.type === 'category') {
              return <h5 key={index} className={styles.category}>{channel.name}</h5>;
            }
            return (
              <div
                key={channel.id}
                className={`${styles.channel} ${channel.id === activeChannel ? styles.active : ''}`}
                onClick={() => setActiveChannel(channel.id)}
              >
                {channel.type === 'text' ? 
                  <FaHashtag className={styles.channelIcon} /> : 
                  <FaVolumeUp className={styles.channelIcon} />
                }
                {channel.name}
              </div>
            );
          })
        ) : (
          <div className={styles.noChannels}>No channels</div>
        )}
      </div>
      <UserInfo />
    </div>
  );
}

export default ChannelPanel;