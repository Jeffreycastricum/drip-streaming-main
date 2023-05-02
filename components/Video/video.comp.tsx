/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useMemo } from 'react'
import { useParticipant } from '@videosdk.live/react-sdk'
import ReactPlayer from 'react-player'
import className from '@/styles/videocomp.module.scss'

function VideoComponent({ participantId, videoTrack, audioTrack }: any) {
  const micRef = useRef<null | any>(null)
  const {
    // webcamStream,
    screenShareStream,
    // micStream,
    webcamOn,
    micOn,
    isLocal,
    screenShareOn,
    displayName,
  } = useParticipant(participantId)

  // ? this is to catch the webcam stream and display it in the video element
  const webcamMediaStream = useMemo(() => {
    /* if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    */
    if (webcamOn && videoTrack) {
      const mediaStream = new MediaStream()
      mediaStream.addTrack(videoTrack)

      return mediaStream
    }

    // }, [webcamStream, webcamOn]);
  }, [videoTrack, webcamOn])

  const screenShareMediaStream = useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const mediaStream = new MediaStream()
      mediaStream.addTrack(screenShareStream.track)
      return mediaStream
    }
  }, [screenShareStream, screenShareOn])

  // ? this is to catch the mic stream and play it in the audio element
  useEffect(() => {
    if (micRef.current) {
      if (micOn && audioTrack) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(audioTrack)
        micRef.current.srcObject = mediaStream
        micRef.current
          .play()
          .catch((error: Error) =>
            console.error('videoElem.current.play() failed', error)
          )
      } else {
        micRef.current.srcObject = null
      }
      /* if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error: Error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
      */
    }
    // }, [micStream, micOn]);
  }, [micOn, audioTrack])

  return (
    <div key={participantId}>
      {micOn && micRef && <audio ref={micRef} autoPlay muted={isLocal} />}
      {/* {!webcamStream && !webcamOn && <Loader />} */}
      <div>
        <div className="container">
          {webcamOn || screenShareOn ? (
            <>
              <div className="screen_share">
                <ReactPlayer
                  playsinline //! DON'T REMOVE THIS
                  pip={false}
                  light={false}
                  controls={false}
                  muted={false}
                  playing
                  url={screenShareMediaStream}
                />
              </div>
              <div className="webcam_share">
                <ReactPlayer
                  playsinline //! DON'T REMOVE THIS
                  pip={false}
                  light={false}
                  controls={false}
                  muted={false}
                  playing
                  url={webcamMediaStream}
                  onError={(err: Error) => {
                    console.log(err, 'participant video error')
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="screen_video">
                <p className="place_holder">
                  {String(displayName).charAt(0).toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoComponent
