import Image from 'next/image'
import { useRouter } from 'next/router'

function LearnMorePage() {
  const router = useRouter()
  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <Image
            onClick={() => router.push('/')}
            src={'/link128.png'}
            width={30}
            height={30}
            className="w-20 h-20 cursor-pointer"
            alt="logo"
          />
          <div>
            <h1 className="text-2xl font-medium mb-2 text-right">
              Linking Your World.
            </h1>
            <p className="text-right">One Click, Infinite Connections!</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-tailwind-blue-500">
          Welcome to Linkverse!
        </h1>
        <p className="text-lg text-gray-800 mb-6">
          Linkverse is a platform designed to streamline the way you share and
          connect with your audience. Whether you&apso;re an influencer,
          creator, or business professional, Linkverse empowers you to curate
          all your important links in one centralized hub.
        </p>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          How Linkverse Works
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          Linkverse offers a user-friendly interface that simplifies the process
          of organizing and presenting your online presence. Here&apos;s a
          step-by-step guide on how Linkverse works:
        </p>
        <ol className="list-decimal pl-6 mb-6">
          <li className="text-lg text-gray-800">
            Sign up for a Linkverse account or log in if you already have one.
          </li>
          <li className="text-lg text-gray-800">
            Create your personalized profile by adding your name, profile
            picture, and a brief bio. This allows visitors to get to know you
            better.
          </li>
          <li className="text-lg text-gray-800">
            Add links to your profile. These could include links to your social
            media profiles, website, blog, portfolio, online store, or any other
            web content you want to share.
          </li>
          <li className="text-lg text-gray-800">
            Customize the appearance of your profile to reflect your personal
            brand. Choose from a variety of themes, colors, and layouts to make
            your profile uniquely yours.
          </li>
          <li className="text-lg text-gray-800">
            Preview your profile to see how it will appear to visitors. Make any
            necessary adjustments to ensure everything looks just right.
          </li>
          <li className="text-lg text-gray-800">
            Make your profile public by publishing it. Once published,
            you&apso;ll receive a unique Linkverse URL that you can share with
            your audience.
          </li>
          <li className="text-lg text-gray-800">
            Engage with your audience by responding to messages and comments
            directly on your Linkverse profile. Use analytics to track the
            performance of your links and optimize your profile for maximum
            impact.
          </li>
        </ol>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Get Started with Linkverse
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          Ready to take your online presence to the next level? Sign up for
          Linkverse today and start sharing your links with the world!
        </p>
        <button
          className="bg-tailwind-blue-500 text-white bg-blue-500 hover:bg-blue-600  py-2 px-4 rounded hover:bg-tailwind-blue-600 transition-all duration-300"
          onClick={() => (window.location.href = '/signup')}
        >
          Sign Up Now
        </button>
        <div className="border-t-[1px] border-gray-300 pt-8 mt-8">
          <p className="text-right">©linkverse {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}

export default LearnMorePage
