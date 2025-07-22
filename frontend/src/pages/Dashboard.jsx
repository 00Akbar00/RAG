import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServerList from '../components/dashboard/ServerList';
import ChannelList from '../components/dashboard/ChannelList';
import TopBar from '../components/dashboard/TopBar';
import ChatSection from '../components/dashboard/ChatSection';
import { setActiveGuild, fetchGuilds, fetchGuild } from '../store/serverSlice';
import styles from '../styles/Dashboard.module.css';

// Mock Data for channels and messages (will be replaced with API calls later)
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
  const { guilds, activeGuild, isLoading, error } = useSelector((state) => state.servers);
  const { token } = useSelector((state) => state.auth);
  const [activeChannel, setActiveChannel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasFetchedGuilds = useRef(false);
  const fetchedGuildIds = useRef(new Set());

  // Fetch guilds when component mounts or token changes
  useEffect(() => {
    if (token && !hasFetchedGuilds.current && guilds.length === 0) {
      console.log('🚀 Fetching guilds for the first time');
      hasFetchedGuilds.current = true;
      dispatch(fetchGuilds(token));
    }
  }, [token, guilds.length, dispatch]);

  // Handle guild selection
  const handleGuildSelect = useCallback((guildId) => {
    if (guildId === 'dm') {
      dispatch(setActiveGuild('dm'));
      setActiveChannel(null);
    } else {
      dispatch(setActiveGuild(guildId));
      
      // Only fetch guild details if we haven't fetched this guild before
      if (!fetchedGuildIds.current.has(guildId)) {
        console.log('🚀 Fetching guild details for guildId:', guildId);
        fetchedGuildIds.current.add(guildId);
        dispatch(fetchGuild({ guildId, token }));
      } else {
        console.log('✅ Guild details already fetched for guildId:', guildId);
      }
      
      // Set first channel as active (mock data for now)
      const currentChannels = mockChannels[guildId] || [];
      const firstChannel = currentChannels.find(c => c.type === 'text');
      setActiveChannel(firstChannel ? firstChannel.id : null);
    }
  }, [dispatch, token]);

  // Get current guild details
  const currentGuild = guilds.find(g => g.id === activeGuild);
  const channels = mockChannels[activeGuild] || [];
  const channelDetails = channels.find(c => c.id === activeChannel);

  if (isLoading && guilds.length === 0) {
    return (
      <div className={styles.dashboard}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#dcddde' }}>
          Loading guilds...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboard}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#ff6b6b' }}>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <ServerList 
        guilds={guilds}
        activeGuild={activeGuild}
        setActiveGuild={handleGuildSelect}
        onAddServerClick={() => setIsModalOpen(true)}
        token={token}
      />
      <ChannelList 
        channels={channels}
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
        guildName={currentGuild?.name || "My Server"}
      />
      <TopBar 
        channel={channelDetails}
        guildName={currentGuild?.name || "My Server"}
      />
      <ChatSection 
        channel={channelDetails}
        messages={mockMessages[activeChannel] || []}
      />
    </div>
  );
}

export default Dashboard;