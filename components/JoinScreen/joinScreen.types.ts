import { Dispatch, SetStateAction } from 'react'

export interface JoinScreenCB {
  getMeetingAndToken: (id: string | null) => void
  setParticipantType: (type: string) => void
  setParticipantName: (name: string) => void
  setJoined?: Dispatch<SetStateAction<boolean>>
  joinMeeting?: () => void
}
