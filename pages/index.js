import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import FlipCard from '../components/home/FlipCard'
import IntroComponent from '../components/home/IntroComponent'

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-tr from-gray-500 via-gray-700 to-black">
      <Head>
        <title>Linkverse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center  text-white">
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="flex flex-row w-[86%]">
            <IntroComponent />

            <FlipCard />
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  )
}
