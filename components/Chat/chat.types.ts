export interface MessageProps {
  id?: string
  message: string
  senderId: string
  senderName: string
  timestamp?: number
  topic?: 'CHAT'
}
