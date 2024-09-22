import Image from 'next/image'
import Link from 'next/link'
import { IoLink } from 'react-icons/io5'
import { isTouchDevice } from '../../utils'
import { useEffect, useState } from 'react'

const FlipCard = () => {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(isTouchDevice())
  }, [])

  return (
    <div className="w-1/2 my-20 lg:my-0 flex justify-center">
      <div className="flip-card w-40 h-40 sm:w-80 sm:h-80 cursor-pointer">
        <div className="flip-card-inner flex">
          <div className="flip-card-front rounded-custom cursor-pointer justify-center items-center flex flip-animation">
            <Image
              src="https://avatars.githubusercontent.com/u/68119190?v=4"
              alt="logo"
              width={500}
              height={500}
              className="object-cover rounded-3xl sm:rounded-custom"
              priority
            />
            <div className="bg-white text-black absolute py-1 px-2 sm:py-2 sm:px-4 text-sm rounded-full -top-10 sm:-top-14 -right-10 sm:-right-14">
              My Linkverse
            </div>
            <div className="bg-white text-black absolute py-1 px-2 sm:py-2 sm:px-4 text-sm rounded-full bottom-4 right-4 sm:bottom-6 sm:right-6">
              {isTouch ? 'Click Me' : 'Hover me'}
            </div>
          </div>
          <div className="flip-card-back  bg-[#3983f5] flex items-center justify-center rounded-custom">
            <Link
              href={'/ghritak'}
              target="_blank"
              className="sm:text-lg text-black bg-white py-2 px-4 rounded-full flex items-center cursor-pointer hover:scale-110 transition-all duration-300"
            >
              <IoLink className="sm:text-xl" />
              /ghritak
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlipCard
