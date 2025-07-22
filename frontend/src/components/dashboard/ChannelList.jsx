import { useSelector } from 'react-redux';
import { FaHashtag, FaVolumeUp } from 'react-icons/fa';

function ChannelList({ channels, activeChannel, setActiveChannel, guildName }) {
  const { username } = useSelector((state) => state.auth);

  return (
    <div className="w-60 bg-[#2f3136] flex flex-col border-r border-[#202225] flex-shrink-0">
      <div className="p-4 font-semibold text-base text-white bg-[#292b2f] border-b border-[#202225] cursor-pointer flex items-center justify-between flex-shrink-0 hover:bg-[#32353b]">
        {guildName} <span className="text-xs text-[#72767d]">&#x25BC;</span>
      </div>
      
      <div className="flex-1 py-2 overflow-y-auto min-h-0">
        {channels.length > 0 ? (
          channels.map((channel, index) => {
            if (channel.type === 'category') {
              return <h5 key={index} className="px-4 py-2 text-xs font-semibold text-[#72767d] uppercase tracking-wide m-0">{channel.name}</h5>;
            }
            return (
              <div
                key={channel.id}
                className={`flex items-center py-1.5 px-4 mx-2 rounded cursor-pointer text-sm transition-colors duration-100 ${
                  channel.id === activeChannel 
                    ? 'bg-[#393c43] text-white' 
                    : 'text-[#8e9297] hover:bg-[#36393f] hover:text-[#dcddde]'
                }`}
                onClick={() => setActiveChannel(channel.id)}
              >
                {channel.type === 'text' ? 
                  <FaHashtag className="mr-2 text-base w-4 text-center" /> : 
                  <FaVolumeUp className="mr-2 text-base w-4 text-center" />
                }
                {channel.name}
              </div>
            );
          })
        ) : (
          <div className="p-4 text-center text-[#72767d] italic">No channels</div>
        )}
      </div>
      
      {/* User Info Section */}
      <div className="p-2 bg-[#292b2f] border-t border-[#202225] flex items-center gap-2 flex-shrink-0">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img src="https://via.placeholder.com/32/7289DA/FFFFFF?text=U" alt="User" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white mb-0.5">{username || 'User'}</div>
          <div className="text-xs text-[#b9bbbe]">Online</div>
        </div>
        <div className="flex gap-1">
          <button className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-1 rounded text-base flex items-center justify-center transition-colors duration-100 hover:bg-[#36393f] hover:text-[#dcddde]">⚙️</button>
          <button className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-1 rounded text-base flex items-center justify-center transition-colors duration-100 hover:bg-[#36393f] hover:text-[#dcddde]">🔊</button>
        </div>
      </div>
    </div>
  );
}

export default ChannelList; 