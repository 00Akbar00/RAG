import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServerList from '../components/dashboard/ServerList';
import ChannelPanel from '../components/dashboard/ChannelPanel';
import ChatPanel from '../components/dashboard/ChatPanel';
import CreateServerModal from '../components/dashboard/CreateServerModal';
import { setActiveServer } from '../store/serverSlice';
import styles from '../styles/Dashboard.module.css';

// Mock Data
const mockChannels = {
  '1': [
    { type: 'category', name: 'TEXT CHANNELS' },
    { id: '101', name: 'general', type: 'text' },
    { id: '102', name: 'off-topic', type: 'text' },
    { type: 'category', name: 'VOICE CHANNELS' },
    { id: '103', name: 'Lobby', type: 'voice' },
  ],
  '2': [
    { type: 'category', name: 'SUBJECTS' },
    { id: '201', name: 'math-help', type: 'text' },
    { id: '202', name: 'history-notes', type: 'text' },
  ],
  '3': [],
};

const mockMessages = {
    '101': [
        { user: 'CoolDude23', avatar: 'https://via.placeholder.com/40/FFFFFF/000000?text=C', timestamp: 'Today at 12:00 PM', text: 'Hey everyone! Welcome to the server.' },
        { user: 'JaneDoe', avatar: 'https://via.placeholder.com/40/FFFFFF/000000?text=J', timestamp: 'Today at 12:01 PM', text: 'Glad to be here!' },
    ],
    '102': [{ user: 'Admin', avatar: '', timestamp: 'Today at 1:00 PM', text: 'Remember to keep conversations friendly.' }],
    '201': [{ user: 'Professor', avatar: '', timestamp: 'Yesterday at 5:30 PM', text: 'The exam is next week.' }],
}

function Dashboard() {
  const dispatch = useDispatch();
  const { servers, activeServer } = useSelector((state) => state.servers);
  const [activeChannel, setActiveChannel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const currentChannels = mockChannels[activeServer] || [];
    const firstChannel = currentChannels.find(c => c.type === 'text');
    setActiveChannel(firstChannel ? firstChannel.id : null);
  }, [activeServer]);

  const channels = mockChannels[activeServer] || [];
  const channelDetails = channels.find(c => c.id === activeChannel);

  return (
    <div className={styles.dashboard}>
      <ServerList 
        servers={servers}
        activeServer={activeServer}
        setActiveServer={(id) => dispatch(setActiveServer(id))}
        onAddServerClick={() => setIsModalOpen(true)}
      />
      <ChannelPanel 
        channels={channels}
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      />
      <ChatPanel 
        channel={channelDetails}
        messages={mockMessages[activeChannel] || []}
      />
      <CreateServerModal 
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Dashboard;