import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-tr from-gray-500 via-gray-700 to-black">
      <Head>
        <title>Linkverse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center mt-10 text-white">
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="flex flex-row w-[86%]">
            <div className="w-1/2 space-y-8">
              <h1 className="text-7xl font-bold">
                Everything you are. In one, simple link in bio.
              </h1>
              <p>
                Join 50M+ people using Linktree for their link in bio. One link
                to help you share everything you create, curate and sell from
                your Instagram, TikTok, Twitter, YouTube and other social media
                profiles.
              </p>
              <div className="flex items-center space-x-10">
                <div className="bg-gray-100 text-gray-600 p-6 rounded-full flex justify-center items-center">
                  <div className="">linkverse.com/</div>
                  <input
                    placeholder="yourname"
                    className="bg-transparent outline-none"
                  />
                </div>
                <button>Claim your linkverse</button>
              </div>
            </div>
            <div className="w-1/2 flex justify-center">
              <Image
                src={require('../public/link.png')}
                alt="logo"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  )
}
