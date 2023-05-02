import { useMeeting } from '@videosdk.live/react-sdk'
import { MessageProps } from './chat.types'

// ? this is to render a single chat message
function ChatMessage({ senderId, senderName, message }: MessageProps) {
  const hookMeeting = useMeeting()
  const localParticipantId = hookMeeting?.localParticipant?.id
  const localSender = localParticipantId === senderId

  return (
    <div
      className={`"chat_message" ${
        localSender ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`"chat_message_body"${
          localSender ? 'items-end' : 'items-start'
        }`}
      >
        <p className="text-sm text-gray-500">{!localSender && senderName}</p>
        <div>
          <p className="chat_message_text">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
