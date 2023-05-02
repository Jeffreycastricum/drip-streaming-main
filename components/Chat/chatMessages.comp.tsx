import { usePubSub } from '@videosdk.live/react-sdk'

import ChatMessage from './chatMessage.comp'
import { MessageProps } from './chat.types'

// ? this is the chat messages, which is a list of chat messages we get from the server
function ChatMessages() {
  // const listRef = useRef();
  const { messages } = usePubSub('CHAT')

  return messages ? (
    <div className="chat_messages">
      {messages.map(
        ({ senderId, senderName, message }: MessageProps, i: number) => {
          return (
            <ChatMessage
              key={`chat_item_${i}`}
              {...{ senderId, senderName, message }}
            />
          )
        }
      )}
    </div>
  ) : (
    <p>No messages</p>
  )
}

export default ChatMessages
