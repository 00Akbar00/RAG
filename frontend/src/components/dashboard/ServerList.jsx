import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { createNewGuild } from '../../store/serverSlice';
import { FaCamera, FaTimes, FaPlus } from 'react-icons/fa';

Modal.setAppElement('#root');

function ServerList({ guilds, activeGuild, setActiveGuild, onAddServerClick, token }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guildName, setGuildName] = useState("");
  const [guildImage, setGuildImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGuildImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateGuild = (e) => {
    e.preventDefault();
    if (guildName.trim() && token) {
      dispatch(createNewGuild({ 
        name: guildName.trim(), 
        iconFile: guildImage, 
        token 
      })).then((result) => {
        if (createNewGuild.fulfilled.match(result)) {
          setIsModalOpen(false);
          setGuildName("");
          setGuildImage(null);
          setImagePreview("");
        }
      });
    }
  };

  return (
    <>
      <div className="w-18 bg-[#202225] flex flex-col items-center py-3 gap-2 flex-shrink-0 border-r border-[#1a1a1a]">
        {/* Direct Message Icon */}
        <div className={`relative cursor-pointer flex items-center justify-center group ${
          'dm' === activeGuild ? 'active' : ''
        }`} onClick={() => setActiveGuild('dm')}>
           <div className={`absolute -left-4 w-1 bg-white rounded-r transition-all duration-200 ${
             'dm' === activeGuild ? 'h-10 opacity-100' : 'h-0 opacity-0'
           }`}></div>
           <div className={`w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-semibold text-lg transition-all duration-200 overflow-hidden ${
             'dm' === activeGuild ? 'bg-[#5865f2] rounded-2xl' : 'bg-[#36393f] group-hover:bg-[#5865f2] group-hover:rounded-2xl'
           }`}>DM</div>
        </div>
        
        <div className="w-8 h-0.5 bg-[#36393f] rounded my-1"></div>

        {guilds.map(guild => (
          <div 
            key={guild.id} 
            className={`relative cursor-pointer flex items-center justify-center group ${
              guild.id === activeGuild ? 'active' : ''
            }`}
            onClick={() => setActiveGuild(guild.id)}
            title={guild.name}
          >
            <div className={`absolute -left-4 w-1 bg-white rounded-r transition-all duration-200 ${
              guild.id === activeGuild ? 'h-10 opacity-100' : 'h-0 opacity-0'
            }`}></div>
            <img 
              src={guild.icon_url || `https://via.placeholder.com/50/7289DA/FFFFFF?text=${guild.name.charAt(0).toUpperCase()}`} 
              alt={guild.name} 
              className={`w-12 h-12 rounded-full bg-[#36393f] flex items-center justify-center text-white font-semibold text-lg transition-all duration-200 overflow-hidden object-cover ${
                guild.id === activeGuild ? 'bg-[#5865f2] rounded-2xl' : 'group-hover:bg-[#5865f2] group-hover:rounded-2xl'
              }`} 
            />
          </div>
        ))}
        
        {/* Add Guild Button */}
        <div className="relative cursor-pointer flex items-center justify-center group" onClick={() => setIsModalOpen(true)}>
          <div className="w-12 h-12 rounded-full bg-[#43B581] flex items-center justify-center text-white font-semibold text-lg transition-all duration-200 overflow-hidden group-hover:bg-[#5865f2] group-hover:rounded-2xl">
            <FaPlus />
          </div>
        </div>
      </div>

      {/* Create Guild Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="relative bg-transparent border-none outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
      >
        <div className="bg-[#36393f] rounded-lg p-8 w-[440px] max-w-[90vw] relative text-[#dcddde]">
          <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 bg-transparent border-none text-[#72767d] cursor-pointer text-xl p-1 rounded transition-colors duration-100 hover:bg-[#40444b] hover:text-[#dcddde]">
              <FaTimes/>
          </button>
          <h2 className="m-0 mb-2 text-2xl font-bold text-white">Customize your server</h2>
          <p className="m-0 mb-6 text-[#b9bbbe] text-sm leading-relaxed">Give your new server a personality with a name and an icon. You can always change it later.</p>

          <form onSubmit={handleCreateGuild}>
            <div className="mb-6">
              <label htmlFor="guild-image-upload" className="block cursor-pointer">
                {imagePreview ? (
                  <img src={imagePreview} alt="Guild preview" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <div className="w-20 h-20 border-2 border-dashed border-[#72767d] rounded-full flex flex-col items-center justify-center text-[#72767d] text-xs font-semibold transition-colors duration-200 hover:border-[#5865f2] hover:text-[#5865f2]">
                    <FaCamera className="text-2xl mb-1" />
                    <span>UPLOAD</span>
                  </div>
                )}
              </label>
              <input
                id="guild-image-upload"
                type="file"
                accept="image/*,image/gif"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>

            <label htmlFor="guild-name" className="block text-xs font-semibold text-[#b9bbbe] mb-2 uppercase tracking-wide">SERVER NAME</label>
            <input
              id="guild-name"
              type="text"
              value={guildName}
              onChange={(e) => setGuildName(e.target.value)}
              placeholder="Enter server name"
              required
              className="w-full p-3 bg-[#40444b] border-none rounded text-[#dcddde] text-sm outline-none box-border focus:bg-[#4f545c] placeholder:text-[#72767d]"
            />

            <div className="flex justify-between mt-6 gap-4">
              <button type="button" className="px-6 py-3 bg-transparent border-none text-[#b9bbbe] text-sm font-medium cursor-pointer rounded transition-colors duration-100 hover:bg-[#40444b] hover:text-[#dcddde]" onClick={() => setIsModalOpen(false)}>Back</button>
              <button type="submit" className="px-6 py-3 bg-[#5865f2] border-none text-white text-sm font-medium cursor-pointer rounded transition-colors duration-100 hover:bg-[#4752c4] disabled:bg-[#40444b] disabled:text-[#72767d] disabled:cursor-not-allowed">Create</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ServerList;