import ChatInput from './chatInput.comp'
import ChatMessages from './chatMessages.comp'

// * so there's a chat input, a chat messages, and a single chat message, all different from one another

function Chat() {
  return (
    <div className="chat_container">
      <div className="chat_container">
        <p>Chat</p>
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  )
}

export default Chat
