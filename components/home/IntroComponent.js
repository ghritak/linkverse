import CreateCard from './CreateCard'

const IntroComponent = () => {
  return (
    <div className="w-1/2 space-y-8">
      <div className="space-y-4">
        <h1 className="text-7xl font-bold">Linking Your World.</h1>{' '}
        <h1 className="text-5xl font-bold">One Click, Infinite Connections!</h1>
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
