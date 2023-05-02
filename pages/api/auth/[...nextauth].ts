/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'john@dripgaming.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize(credentials) {
        if (
          credentials?.username === 'john@dripgaming.com' &&
          credentials?.password === 'test'
        ) {
          // Data should be fetched from database/ethereum in future
          return {
            id: '1',
            name: 'John Doe',
            email: 'john@dripgaming.com',
          }
        }
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.JWT_SECRET,
})
