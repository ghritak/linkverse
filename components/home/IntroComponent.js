import CreateCard from './CreateCard'

const IntroComponent = () => {
  return (
    <div className="lg:w-1/2 w-full space-y-4 sm:space-y-8 mt-20 sm:mt-0">
      <div className="sm:space-y-4">
        <h1 className="text-xl md:text-7xl font-bold">Linking Your World.</h1>{' '}
        <h1 className="text-lg md:text-5xl font-bold">
          One Click, Infinite Connections!
        </h1>
      </div>
      <p>
        Join the multiverse using Linkverse for your link in bio. One link to
        help you share everything you create, curate and sell from your
        Instagram, TikTok, Twitter, YouTube and other social media profiles.
      </p>
      <CreateCard />
    </div>
  )
}

export default IntroComponent
