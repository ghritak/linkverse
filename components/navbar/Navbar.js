import Image from 'next/image'
import Link from 'next/link'
import { IoLogInOutline } from 'react-icons/io5'

const Navbar = () => {
  return (
    <nav className="sticky w-[86%] top-10 z-50 flex items-center justify-between bg-white shadow-md p-4 rounded-full left-10 right-10">
      <div className="text-2xl font-medium">
        <Link href="/" className="flex items-center ml-4">
          <Image
            src={require('../../public/link.png')}
            alt="logo"
            width={40}
            height={40}
          />
          <h1 className="ml-3">Linkverse</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          href="/login"
          className="mr-4 text-lg font-medium py-3 px-6 rounded-full transition-all duration-300 hover:bg-black hover:text-white flex items-center"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="text-lg bg-black text-white py-3 px-6 rounded-full transition-all duration-300 hover:opacity-70 flex items-center"
        >
          Sign Up
          <IoLogInOutline size={24} className="ml-1" />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
