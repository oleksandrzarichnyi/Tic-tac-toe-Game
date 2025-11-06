import { useState, useRef, useEffect } from 'react'
import { useChatStore } from '../hooks/useChatStore'

import xAvatar from '../img/player-x-avatar.png'
import oAvatar from '../img/player-o-avatar.png'
import chatSendIcon from '../icons/send-icon.png'

import { MapMessages } from './MapMessages.jsx'

export function Chat({ player }) {
  const { messages, sendMessage } = useChatStore();
  const [ messageText, setMessageText ] = useState('');
  const bottomRef = useRef(null);

  const playerChatName = player === 'X' ? 'Player 2' : 'Player 1';
  const playerChatIcon = player === 'X' ? oAvatar : xAvatar;

  function handleSubmit(event) {
    event.preventDefault();

    if (!messageText.trim()) return;

    sendMessage(messageText, player);

    setMessageText('');
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  return (
    <div className="flex flex-col max-w-[640px] w-full h-[484px] bg-[#313131] rounded-t-[8px] outline outline-[1px] outline-[#454545] mt-[38px]">
      <div className="w-full h-[50px] bg-[#222222] p-[9px]">
        <div className="flex gap-[8px] items-center">
          <img src={playerChatIcon} className="w-[32px] h-[32px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-full" />
          <p>{playerChatName}</p>
        </div>
      </div>
      <div className="w-full h-full py-[24px] px-[20px] overflow-y-auto scrollbar-hidden flex flex-col">
        <MapMessages messages={messages} player={player} />
        <div ref={bottomRef}></div>
      </div>
      <form 
        className="px-[16px] items-center max-w-[600px] w-full h-[56px] mx-auto mb-[30px] flex justify-between bg-[#424242] outline outline-[1px] outline-[#8B8B8B] outline-solid rounded-lg"
        onSubmit={handleSubmit}
      >
        <input 
          type="text" 
          placeholder="Message" 
          className="chat-input" 
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
        />
        <button 
          type="submit" 
          className="w-[24px] h-[24px] bg-center bg-no-repeat bg-contain" 
          style={{ backgroundImage: `url(${chatSendIcon})`}}
        ></button>
      </form>
    </div>
  )
}