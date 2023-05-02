import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store'

import { decrement, increment } from '@/features/counter/counter.slice'

import { JoinScreenCB } from './joinScreen.types'

// ? getMeetingAndToken is a callback function that is passed from the parent component,
// ? it is used to fetch the meeting id and token from the API and then set the meeting id in the local state of this component

function JoinScreen({
  getMeetingAndToken,
  setParticipantType,
  setParticipantName,
}: JoinScreenCB) {
  //* local state of the meeting id
  const [meetingId, setMeetingId] = useState<null | string>(null)

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  //* onClick handler for the join button
  const onClickJoin = async () => {
    if (meetingId) {
      if (meetingId.length > 0) {
        await getMeetingAndToken(meetingId)
        setParticipantType('VIEWER')
      }
    } else {
      alert('Please enter a meeting id')
    }
  }
  //* onClick handler for the create meeting button
  const onClickCreate = async () => {
    await getMeetingAndToken(null)
    setParticipantType('HOST')
  }
  //* onClick handler for Join as Host button
  // const onClickJoinAsHost = async () => {
  //   await getMeetingAndToken(meetingId)
  //   setParticipantType('HOST')
  // }

  return (
    <div className="text-xl text-white ">
      <h2 className="text-center">JoinScreen Comp</h2>
      <div className="joinscreen_container">
        <input
          className="styled_input"
          type="text"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value)
          }}
        />
        <input
          onChange={(e) => setParticipantName(e.target.value)}
          placeholder="Enter your name"
          className="styled_input"
        />
        <div className="">
          <button type="button" className="styled_button" onClick={onClickJoin}>
            Join
          </button>
          {' or '}
          <button
            type="button"
            className="styled_button"
            onClick={onClickCreate}
          >
            Create Meeting
          </button>
        </div>
      </div>
      <h1 className="my-5 text-center">
        this is to show the redux state pattern working
      </h1>
      <div className="flex justify-center m-5 space-x-4">
        <button
          className="px-2 bg-neutral-950"
          type="button"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          className="px-2 bg-neutral-950"
          type="button"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
export default JoinScreen
