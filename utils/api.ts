// API call to create meeting
const API_BASE_URL = 'https://api.videosdk.live'
//! Auth token needs to be generated each 7 days
//* Auth code is for a month
export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwNDQ5NWRiYS0wNmIyLTRhYjktOGQ0Yi1iNjk3NDBkY2FhMjgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY3OTA3MTA5MywiZXhwIjoxNjg2ODQ3MDkzfQ.6TqzJu0hL_QYwvQu08tdf0eN1yNhG5w0asE0BZkF8Ws'

export const createMeeting = async ({ token }: any) => {
  const res = await fetch(`${API_BASE_URL}/v1/meetings`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })

  const { meetingId } = await res.json()
  return meetingId
}

// export const validateMeeting = async ({ roomId, token }) => {
//   const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

//   const options = {
//     method: "GET",
//     headers: { Authorization: token, "Content-Type": "application/json" },
//   };

//   const result = await fetch(url, options)
//     .then((response) => response.json()) //result will have meeting id
//     .catch((error) => console.error("error", error));

//   return result ? result.roomId === roomId : false;
// };
