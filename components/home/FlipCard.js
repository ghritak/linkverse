import Image from 'next/image'
import Link from 'next/link'
import { IoLink } from 'react-icons/io5'

const FlipCard = () => {
  return (
    <div className="w-1/2 flex justify-center">
      <div className="flip-card h-96 w-96 cursor-pointer ">
        <div className="flip-card-inner">
          <div className="flip-card-front rounded-custom overflow-hidden">
            <Image
              src="https://linkverse.onrender.com/images/profile_photos/profile_photo-1717319579874IMG20230.%20%20%20403151417-01-removebg-preview%20(1)-01%20(1).jpeg"
              alt="logo"
              width={500}
              height={500}
              className="object-cover flip-animation rounded-custom"
              priority
            />
          </div>
          <div className="flip-card-back bg-[#3983f5] flex items-center justify-center rounded-custom">
            <Link
              href={'/ghritak'}
              className="text-lg text-black bg-white py-2 px-4 rounded-full flex items-center cursor-pointer hover:scale-110 transition-all duration-300"
            >
              <IoLink size={22} />
              /ghritak
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlipCard
