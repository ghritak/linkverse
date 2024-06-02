import Image from 'next/image'
import Link from 'next/link'
import { IoLogInOutline } from 'react-icons/io5'

const Navbar = () => {
  return (
    <nav className="sticky w-[88%] top-0 pt-10 rounded-bl-custom rounded-br-custom z-50  backdrop-blur-sm">
      <div className="flex items-center justify-between bg-white p-2 md:p-4 rounded-full">
        <div className="text-lg md:text-2xl font-medium">
          <Link href="/" className="flex items-center ml-2 md:ml-4">
            <Image
              src={require('../../public/link.png')}
              alt="logo"
              className="w-8 h-8 md:w-12 md:h-12"
            />
            <h1 className="ml-1 md:ml-3">Linkverse</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="/login"
            className="mr-2 md:mr-4 text-sm md:text-lg font-medium py-2 md:py-3 px-3 md:px-6 rounded-full transition-all duration-300 hover:bg-black hover:text-white flex items-center"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm md:text-lg bg-black text-white py-2 md:py-3 px-3 md:px-6 rounded-full transition-all duration-300 hover:opacity-70 flex items-center"
          >
            Signup
            <IoLogInOutline className="ml-1 text-lg md:text-2xl" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
