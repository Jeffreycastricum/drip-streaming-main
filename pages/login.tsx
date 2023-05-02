/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'

const Login: NextPage = () => {
  const { data: session } = useSession()

  return session ? (
    <div>
      <h2 className="text-white text-md">Welcome, {session.user?.name}</h2>
      <button
        type="button"
        className="text-white text-md"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  ) : (
    <div>
      <h3 className="text-white text-md">You are not signed in</h3>
      <button
        type="button"
        className="text-white text-md"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </div>
  )
}

export default Login
