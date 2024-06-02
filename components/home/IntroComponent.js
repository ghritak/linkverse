import { MdAddLink } from 'react-icons/md'

const IntroComponent = () => {
  return (
    <div className="w-1/2 space-y-8">
      <h1 className="text-7xl font-bold">
        Everything you are. In one, simple link in bio.
      </h1>
      <p>
        Join 50M+ people using Linktree for their link in bio. One link to help
        you share everything you create, curate and sell from your Instagram,
        TikTok, Twitter, YouTube and other social media profiles.
      </p>
      <div className="flex items-center space-x-6">
        <div className="bg-gray-100 text-gray-600 p-6 rounded-full flex justify-center items-center">
          <div className="">linkverse.com/</div>
          <input
            placeholder="yourname"
            className="bg-transparent outline-none"
          />
        </div>
        <button className="py-6 px-8 bg-black hover:bg-slate-800 transition-all duration-300 rounded-full flex items-center">
          Claim your linkverse
          <MdAddLink size={24} className="ml-2" />
        </button>
      </div>
    </div>
  )
}

export default IntroComponent
