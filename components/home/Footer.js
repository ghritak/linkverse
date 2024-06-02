import Link from 'next/link'
import CreateCard from './CreateCard'

const Footer = () => {
  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <div className="h-[400px] bg-[#2a313d] w-[86%] rounded-custom flex flex-col justify-center items-center space-y-10">
        <div className="text-3xl md:text-5xl text-white font-bold w-2/3 md:w-1/2 text-center">
          Jumpstart your corner of the internet today
        </div>
        <div className="mx-10">
          <CreateCard />
        </div>
      </div>
      <div className="my-10 text-white">
        <div>
          © {new Date().getFullYear()} Linkverse | Developed by{' '}
          <Link
            href={'https://ghritak.github.io'}
            target="blank"
            className="text-blue-400 hover:text-blue-500 transition-all duration-300"
          >
            Ghritak Jyoti Kalita
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
