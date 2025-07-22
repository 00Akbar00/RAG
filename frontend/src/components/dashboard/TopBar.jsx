import { FaHashtag, FaBell, FaThumbtack, FaUsers, FaSearch } from 'react-icons/fa';

function TopBar({ channel, guildName }) {
  return (
    <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-2">
        <FaHashtag className="text-[#72767d] text-xl" />
        <span className="font-semibold text-base text-white">{channel?.name || 'No Channel Selected'}</span>
        {channel && (
          <span className="text-[#72767d] text-sm ml-2">
            Channel description goes here
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <button className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-2 rounded text-base flex items-center justify-center transition-colors duration-100 hover:bg-[#40444b] hover:text-[#dcddde]" title="Notifications">
          <FaBell />
        </button>
        <button className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-2 rounded text-base flex items-center justify-center transition-colors duration-100 hover:bg-[#40444b] hover:text-[#dcddde]" title="Pinned Messages">
          <FaThumbtack />
        </button>
        <button className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-2 rounded text-base flex items-center justify-center transition-colors duration-100 hover:bg-[#40444b] hover:text-[#dcddde]" title="Show Members">
          <FaUsers />
        </button>
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-[#202225] border-none rounded py-2 px-3 pr-8 text-[#dcddde] text-sm w-36 outline-none placeholder:text-[#72767d] focus:bg-[#40444b]"
          />
          <FaSearch className="absolute right-2 text-[#72767d] text-sm" />
        </div>
        <button className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-2 rounded text-base flex items-center justify-center transition-colors duration-100 hover:bg-[#40444b] hover:text-[#dcddde]" title="Inbox">
          📥
        </button>
        <button className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-2 rounded text-base flex items-center justify-center transition-colors duration-100 hover:bg-[#40444b] hover:text-[#dcddde]" title="Help">
          ❓
        </button>
      </div>
    </div>
  );
}

export default TopBar; 