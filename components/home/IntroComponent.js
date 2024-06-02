import CreateCard from './CreateCard'

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
      <CreateCard />
    </div>
  )
}

export default IntroComponent
