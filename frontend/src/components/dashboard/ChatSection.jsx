import { useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { FaSmile, FaGift, FaImage } from 'react-icons/fa';

function ChatSection({ channel, messages }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && channel) {
      // Handle message submission here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  if (!channel) {
    return (
      <div className="flex flex-col flex-1 bg-[#36393f] min-h-0">
        <div className="flex flex-col items-center justify-center h-full text-[#72767d] text-center">
          <h2 className="mb-2 text-[#dcddde]">No Text Channel Selected</h2>
          <p>Select a text channel from the list to start chatting.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col flex-1 bg-[#36393f] min-h-0">
      <div className="flex-1 p-4 overflow-y-auto min-h-0">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="flex mb-4 py-0.5 hover:bg-[#32353b] hover:rounded">
              <img src={msg.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-white text-sm">{msg.user}</span>
                  <span className="text-[#72767d] text-xs">{msg.timestamp}</span>
                </div>
                <p className="text-[#dcddde] text-sm leading-relaxed m-0 break-words">{msg.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-[#72767d] text-center">
            <h3 className="mb-2 text-[#dcddde]">No messages yet</h3>
            <p>Be the first to send a message in #{channel.name}!</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 bg-[#36393f] border-t border-[#202225] flex-shrink-0">
        <div className="flex items-center bg-[#40444b] rounded-lg px-4 gap-2">
          <button type="button" className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-2 rounded text-xl flex items-center justify-center transition-colors duration-100 hover:bg-[#4f545c] hover:text-[#dcddde]">
            <IoMdAddCircle />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${channel.name}`}
            className="flex-1 bg-transparent border-none text-[#dcddde] text-sm py-3 outline-none placeholder:text-[#72767d]"
          />
          <div className="flex gap-1">
            <button type="button" className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-2 rounded text-base flex items-center justify-center transition-colors duration-100 hover:bg-[#4f545c] hover:text-[#dcddde]">
              <FaGift />
            </button>
            <button type="button" className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-2 rounded text-base flex items-center justify-center transition-colors duration-100 hover:bg-[#4f545c] hover:text-[#dcddde]">
              <FaImage />
            </button>
            <button type="button" className="bg-transparent border-none text-[#b9bbbe] cursor-pointer p-2 rounded text-base flex items-center justify-center transition-colors duration-100 hover:bg-[#4f545c] hover:text-[#dcddde]">
              <FaSmile />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatSection; 