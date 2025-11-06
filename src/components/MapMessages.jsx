export function MapMessages({ messages, player }) {
  return (
    <>     
      {messages.map((msg) => (
        <p
          key={msg.time}
          className={msg.sender === player ? 'user-message' : 'companion-message'}
        >
          {msg.text}
          <span className="message-time">
            {new Date(msg.time).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </p>
      ))}
    </>
  )
}