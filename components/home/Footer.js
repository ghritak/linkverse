import CreateCard from './CreateCard'

const Footer = () => {
  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <div className="h-[400px] bg-[#2a313d] w-[86%] rounded-3xl flex flex-col justify-center items-center space-y-10">
        <div className="text-5xl text-white font-bold w-1/2 text-center">
          Jumpstart your corner of the internet today
        </div>
        <CreateCard />
      </div>
      <div className="my-10 text-white">
        <div>© 2024 CineCrate | Developed by Ghritak Jyoti Kalita</div>
      </div>
    </div>
  )
}

export default Footer
