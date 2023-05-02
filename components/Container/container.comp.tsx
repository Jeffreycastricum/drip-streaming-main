/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react'
import { useMeeting } from '@videosdk.live/react-sdk'

import Controls from '../Controls'
import VideoComponent from '../Video'
import Chat from '../Chat'
import { ContainerProps } from './container.types'

function Container({ meetingId, participantType }: ContainerProps) {
  const [toggleChat, setToggleChat] = useState<boolean>(false)

  const { join, participants } = useMeeting()

  const [webcams, setWebcams] = useState<InputDeviceInfo[]>([])
  const [mics, setMics] = useState<InputDeviceInfo[]>([])

  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack | null>(null)
  const [audioTrack, setAudioTrack] = useState<MediaStreamTrack | null>(null)

  const videoTrackRef = useRef<MediaStreamTrack>()
  const audioTrackRef = useRef<MediaStreamTrack>()

  const getDefaultMediaTracks = async ({ mic, webcam }: any) => {
    if (mic) {
      const audioConstraints = {
        audio: true,
      }

      const stream = await navigator.mediaDevices.getUserMedia(audioConstraints)
      const audioTracks = stream.getAudioTracks()
      const soundTrack = audioTracks.length ? audioTracks[0] : null
      setAudioTrack(soundTrack)
    }

    if (webcam) {
      const videoConstraints = {
        video: {
          width: 1280,
          height: 720,
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(videoConstraints)
      const videoTracks = stream.getVideoTracks()
      const vidTrack = videoTracks.length ? videoTracks[0] : null
      setVideoTrack(vidTrack)
    }
  }
  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const webcamsFound = devices.filter((d) => d.kind === 'videoinput')
      const micsFound = devices.filter((d) => d.kind === 'audioinput')

      setWebcams(webcamsFound)
      setMics(micsFound)

      const hasMic = mics.length > 0
      const hasWebcam = webcams.length > 0

      await getDefaultMediaTracks({
        mic: hasMic,
        webcam: hasWebcam,
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (meetingId) {
      join()
    }
    getDevices()
  }, [meetingId])

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingId!)
  }
  const changeWebcam = async (deviceId: string) => {
    const currentVideoTrack = videoTrackRef.current

    if (currentVideoTrack) {
      currentVideoTrack.stop()
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId },
    })
    const videoTracks = stream.getVideoTracks()
    const vidTrack = videoTracks.length ? videoTracks[0] : null

    setVideoTrack(vidTrack)
  }

  const changeMic = async (deviceId: string) => {
    const currentAudioTrack = audioTrackRef.current

    if (currentAudioTrack) {
      currentAudioTrack.stop()
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId },
    })
    const audioTracks = stream.getAudioTracks()
    const soundTrack = audioTracks.length ? audioTracks[0] : null

    setAudioTrack(soundTrack)
  }
  //* ** here to is to customize the layout of the participants grid
  return (
    <div className="text-xl text-center text-white ">
      <h2>Container Comp</h2>
      <div className="container_header">
        <h3 className="text-2xl">Meeting Id: {meetingId}</h3>
        <button type="button" className="styled_button" onClick={handleCopy}>
          Copy
        </button>
      </div>

      <div>
        <div className="container_body">
          <div className="container_body_grid">
            {[...participants.keys()].map((participantId, idx) => (
              <VideoComponent
                key={idx}
                participantId={participantId}
                videoTrack={videoTrack}
                audioTrack={audioTrack}
              />
            ))}
          </div>
          {toggleChat && (
            <div className="w-3/12">
              <Chat />
            </div>
          )}
        </div>
        <Controls
          participantType={participantType}
          toggleChat={setToggleChat}
          webcams={webcams}
          videoTrack={videoTrack}
          changeWebcam={changeWebcam}
          mics={mics}
          audioTrack={audioTrack}
          changeMic={changeMic}
        />
      </div>
    </div>
  )
}

export default Container
