import { useState } from 'react'
import { MeetingProvider } from '@videosdk.live/react-sdk'
import { authToken, createMeeting } from '@/utils/api'

import JoinScreen from '../JoinScreen'
import Container from '../Container'

// TODO: the Grid when sharing the screen, camera feed needs to be small and the Screen sharing needs to fill up the space
// TODO: Presentation UI needs to be done properly
// TODO: Adding the mic and camera sources to the UI
//* after the all these are done, we'd have a prototype ready
// TODO: CHAT UI needs to be overhauled
// TODO: Implementing a profile system, You can check other people profiles, you'd have to be signed in though when you're inside, you'd have an array of people on the left of those who're streaming as of now (basic stuff)
// TODO: hide the meeting ID and use the profile system

// ? There's this idea i have, since the HOST will have control over cam access, we'll give it to em when first launching the site, then it won't require any loading shit

const Main = () => {
  //! global state of the meeting id
  const [meetingId, setMeetingId] = useState<null | string>(null)
  const [participantName, setParticipantName] = useState<string>('')
  const [participantType, setParticipantType] = useState<string>('')
  const [joined, setJoined] = useState<boolean>(false)

  //* fetching id and token from their API
  const getMeetingAndToken = async (id: string | null) => {
    const fetchedId =
      id == null ? await createMeeting({ token: authToken }) : id
    setMeetingId(fetchedId)
    setJoined(true)
  }
  //* returns the Meeting screen when authenticated, read the docs for more info
  return authToken && meetingId && joined ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: false,
        webcamEnabled: false,
        name: participantName || 'Guest',
      }}
      token={authToken}
    >
      <Container meetingId={meetingId} participantType={participantType} />
    </MeetingProvider>
  ) : (
    <JoinScreen
      getMeetingAndToken={getMeetingAndToken}
      setParticipantType={setParticipantType}
      setParticipantName={setParticipantName}
    />
  )
}

export default Main
