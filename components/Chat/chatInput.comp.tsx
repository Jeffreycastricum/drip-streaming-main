import { useRef, useState, KeyboardEvent } from 'react'
import { usePubSub } from '@videosdk.live/react-sdk'

// ? this is sent to the server, and then the server sends it back to the client, in this !
function ChatInput() {
  const [message, setMessage] = useState<string>('')
  const { publish } = usePubSub('CHAT')

  const input = useRef<HTMLInputElement>(null)
  // ? we'll send the message to the server, and then the server will send it back to the the other comp,
  // ? which will then render it on the screen

  function sendMessage(messageRaw: string): void {
    const messageText = messageRaw.trim()
    if (messageText.length > 0) {
      publish(messageText, { persist: true })
      setTimeout(() => {
        setMessage('')
      }, 100)
      input.current?.focus()
    }
  }

  const handleKeyPress = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(message)
    }
  }

  return (
    <div className="flex justify-between">
      <input
        type="text"
        className="chat_input"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
        }}
        onKeyDown={handleKeyPress}
      />
      <button
        type="button"
        className="chat_button"
        onClick={() => sendMessage(message)}
        disabled={message.length < 2}
      >
        Send
      </button>
    </div>
  )
}

export default ChatInput
