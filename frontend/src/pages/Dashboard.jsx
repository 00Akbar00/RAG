import { useState } from 'react';
import ServerList from '../components/dashboard/ServerList';
import ChannelPanel from '../components/dashboard/ChannelPanel';
import ChatPanel from '../components/dashboard/ChatPanel';
import styles from '../styles/Dashboard.module.css';

// Mock Data
const mockServers = [
  { id: '1', name: 'My Gaming Server', imageUrl: 'https://via.placeholder.com/50/7289DA/FFFFFF?text=G' },
  { id: '2', name: 'Study Group', imageUrl: 'https://via.placeholder.com/50/43B581/FFFFFF?text=S' },
  { id: '3', name: 'Art Club', imageUrl: 'https://via.placeholder.com/50/FAA61A/FFFFFF?text=A' },
];

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
  const [activeServer, setActiveServer] = useState(mockServers[0].id);
  const [activeChannel, setActiveChannel] = useState(mockChannels[activeServer][1].id);

  const channels = mockChannels[activeServer] || [];
  const channelDetails = channels.find(c => c.id === activeChannel);

  return (
    <div className={styles.dashboard}>
      <ServerList 
        servers={mockServers}
        activeServer={activeServer}
        setActiveServer={setActiveServer}
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
    </div>
  );
}

export default Dashboard;