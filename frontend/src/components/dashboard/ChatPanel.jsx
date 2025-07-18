import styles from '../../styles/ChatPanel.module.css';
import { FaHashtag } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';

function ChatPanel({ channel, messages }) {
  if (!channel) {
    return (
        <div className={styles.chatPanel}>
            <div className={styles.topBar}></div>
            <div className={styles.chatContent}>
                <div className={styles.noChannelSelected}>
                    <h2>No Text Channel Selected</h2>
                    <p>Select a text channel from the list to start chatting.</p>
                </div>
            </div>
        </div>
    );
  }
  
  return (
    <div className={styles.chatPanel}>
      <div className={styles.topBar}>
        <FaHashtag className={styles.channelIcon} />
        <span className={styles.channelName}>{channel.name}</span>
      </div>
      
      <div className={styles.chatContent}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <img src={msg.avatar} alt="avatar" className={styles.avatar} />
            <div className={styles.messageBody}>
              <div className={styles.messageHeader}>
                <span className={styles.username}>{msg.user}</span>
                <span className={styles.timestamp}>{msg.timestamp}</span>
              </div>
              <p className={styles.text}>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.chatInputWrapper}>
          <div className={styles.chatInput}>
            <IoMdAddCircle className={styles.addIcon} />
            <input type="text" placeholder={`Message #${channel.name}`} />
          </div>
      </div>
    </div>
  );
}

export default ChatPanel;