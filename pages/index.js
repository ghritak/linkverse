import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import FlipCard from '../components/home/FlipCard'
import IntroComponent from '../components/home/IntroComponent'
import Footer from '../components/home/Footer'

export default function Home() {
  return (
    <div className="flex flex-col items-center ">
      <Head>
        <title>Linkverse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center  text-white">
        <div className="flex justify-center items-center min-h-screen w-screen">
          <div className="flex flex-col lg:flex-row w-[86%] justify-center items-center mt-20">
            <IntroComponent />
            <FlipCard />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
