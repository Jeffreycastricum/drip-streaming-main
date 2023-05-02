/* eslint-disable react/function-component-definition */
import dynamic from 'next/dynamic'
import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '@/components/Navbar/index'
import Footer from '@/components/Footer/index'

// ? this is crucial, without this, the app will keep crashing
const MeetingAppContainer = dynamic(
  () => import('../components/Main/main.comp'),
  {
    ssr: false,
  }
)

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Drip-Streaming</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="drip-container">
        <Navbar />
        <div className="p-10">
          <MeetingAppContainer />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home
