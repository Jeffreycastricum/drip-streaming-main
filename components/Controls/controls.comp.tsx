import { useMeeting } from '@videosdk.live/react-sdk'

import { ControlsProps } from './controls.types'

//* It works somehow

function Controls({
  participantType,
  toggleChat,
  webcams,
  videoTrack,
  changeWebcam,
  mics,
  audioTrack,
  changeMic,
}: ControlsProps) {
  const { leave, toggleMic, toggleWebcam, toggleScreenShare } = useMeeting()

  /* const [webcams, setWebcams] = useState<InputDeviceInfo[]>([]);
  const [mics, setMics] = useState<InputDeviceInfo[]>([]);
  const [dlgMuted, setDlgMuted] = useState(false);

  const [audioTrack, setAudioTrack] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);

  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });

  const videoTrackRef = useRef();
  const audioTrackRef = useRef();

  useEffect(() => {
    getDevices();
  }, []);

  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const webcamsFound = devices.filter((d) => d.kind === "videoinput");
      const micsFound = devices.filter((d) => d.kind === "audioinput");

      setWebcams(webcamsFound);
      setMics(micsFound);

      const hasMic = mics.length > 0;
      const hasWebcam = webcams.length > 0;

      if (hasMic) {
        startMuteListener();
      }

      getDefaultMediaTracks({
        mic: hasMic && micEnabled,
        webcam: hasWebcam && webcamEnabled,
        firstTime: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function startMuteListener() {
    const currentAudioTrack = audioTrackRef.current;

    if (currentAudioTrack) {
      if (currentAudioTrack.muted) {
        setDlgMuted(true);
      }

      currentAudioTrack.addEventListener("mute", (ev) => {
        setDlgMuted(true);
      });
    }
  }

  const getDefaultMediaTracks = async ({ mic, webcam, firstTime }) => {
    if (mic) {
      const audioConstraints = {
        audio: true,
      };

      const stream = await navigator.mediaDevices.getUserMedia(audioConstraints);
      const audioTracks = stream.getAudioTracks();
      const audioTrack = audioTracks.length ? audioTracks[0] : null;
      setAudioTrack(audioTrack);

      if (firstTime) {
        setSelectedMic({
          id: audioTrack?.getSettings()?.deviceId,
        });
      }
    }

    if (webcam) {
      const videoConstraints = {
        video: {
          width: 1280,
          height: 720,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      const videoTracks = stream.getVideoTracks();
      const videoTrack = videoTracks.length ? videoTracks[0] : null;
      setVideoTrack(videoTrack);

      if (firstTime) {
        setSelectedWebcam({
          id: videoTrack?.getSettings()?.deviceId,
        });
      }
    }
  };
  */

  const parseWebcams = (devices: InputDeviceInfo[]) => {
    return devices?.map((device: InputDeviceInfo, idx: number) => {
      return (
        <option value={device?.deviceId} key={idx}>
          {device?.label === '' ? `No Devices found` : device?.label}
        </option>
      )
    })
  }

  return (
    <div className="mt-10 space-x-5">
      {participantType === 'VIEWER' ? (
        <>
          <h1>Viewer</h1>
          <br />
          <button
            type="button"
            className="px-3 py-1 rounded hover:bg-red-700 bg-neutral-800"
            onClick={leave}
          >
            Leave
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded hover:bg-red-700 bg-neutral-800"
            onClick={() => toggleChat((prev) => !prev)}
          >
            Chat
          </button>
        </>
      ) : (
        <>
          <h1>Host</h1>
          <br />
          <button
            type="button"
            className="px-3 py-1 rounded hover:bg-red-700 bg-neutral-800"
            onClick={leave}
          >
            Leave
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded hover:bg-neutral-700 bg-neutral-800"
            onClick={toggleMic}
          >
            Toggle Mic
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded hover:bg-neutral-700 bg-neutral-800"
            onClick={toggleWebcam}
          >
            Toggle Webcam
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded hover:bg-neutral-700 bg-neutral-800"
            onClick={toggleScreenShare}
          >
            Toggle ScreenShare
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded hover:bg-red-700 bg-neutral-800"
            onClick={() => toggleChat((prev) => !prev)}
          >
            Chat
          </button>
          <br />
          <br />
          <select
            className="px-3 py-1 rounded hover:bg-neutral-700 bg-neutral-800"
            value={videoTrack?.getSettings()?.deviceId}
            onChange={(e) => {
              changeWebcam(e.target.value)
            }}
          >
            {parseWebcams(webcams)}
          </select>
          <select
            className="px-3 py-1 rounded hover:bg-neutral-700 bg-neutral-800"
            value={audioTrack?.getSettings()?.deviceId}
            onChange={(e) => {
              changeMic(e.target.value)
            }}
          >
            {parseWebcams(mics)}
          </select>
        </>
      )}
    </div>
  )
}

export default Controls
