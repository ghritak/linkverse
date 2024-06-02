import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Linkverse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-white mt-20">
        <h1 className="text-5xl font-bold text-center">
          Welcome to Our Product
        </h1>
        <p className="mt-4 text-2xl text-center">
          Discover the features and benefits of our amazing product.
        </p>
        <div className="mt-8 flex flex-col md:flex-row items-center h-screen">
          {/* <img
            src="/product-image.jpg"
            alt="Product Image"
            className="w-64 h-auto mb-8 md:mb-0 md:mr-8"
          /> */}
          <div className="max-w-md">
            <h2 className="text-3xl font-semibold">Product Name</h2>
            <p className="mt-4 text-lg">
              Our product offers exceptional features and outstanding
              performance.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white text-lg rounded hover:bg-blue-600">
              Learn More
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center h-screen w-screen bg-gray-700">
          {/* <img
            src="/product-image.jpg"
            alt="Product Image"
            className="w-64 h-auto mb-8 md:mb-0 md:mr-8"
          /> */}
          <div className="max-w-md">
            <h2 className="text-3xl font-semibold">Product Name</h2>
            <p className="mt-4 text-lg">
              Our product offers exceptional features and outstanding
              performance.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white text-lg rounded hover:bg-blue-600">
              Learn More
            </button>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  )
}
