import { Dispatch, SetStateAction } from 'react'

export interface ControlsProps {
  participantType: string
  toggleChat: Dispatch<SetStateAction<boolean>>
  webcams: InputDeviceInfo[]
  videoTrack: MediaStreamTrack | null
  changeWebcam: (deviceId: string) => void
  mics: InputDeviceInfo[]
  audioTrack: MediaStreamTrack | null
  changeMic: (deviceId: string) => void
}
