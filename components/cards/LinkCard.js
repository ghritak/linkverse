import Image from 'next/image'
import { IoShareOutline } from 'react-icons/io5'
import { Button } from '../button/Button'
import { useState } from 'react'

const LinkCard = ({ item, handleClickDot }) => {
  const [isWarning, setWarning] = useState(false)

  const handleExternalLinkClick = (event, item) => {
    event.preventDefault()
    if (item.sensitive) {
      setWarning(!isWarning)
      return
    }
    window.open(item.link, '_blank')
  }

  const handleSensitiveContent = (event, item) => {
    event.preventDefault()
    window.open(item.link, '_blank')
  }

  return (
    <div className=" my-6">
      <div
        onClick={(e) => handleExternalLinkClick(e, item)}
        className="flex z-10 justify-between items-center w-full flex-1 border-[1px] p-2 rounded-lg text-white bg-gray-600 hover:scale-[102%] cursor-pointer transition-all duration-300"
      >
        {item.logo ? (
          <Image
            src={item.logo}
            alt="Link logo"
            width={100}
            height={100}
            className="w-10 h-10"
          />
        ) : (
          <div className="w-11 h-10 mx-1 bg-gray-300 animate-pulse rounded-lg"></div>
        )}
        <div className="w-full">
          <h1 className="text-center mx-2">{item?.name}</h1>
        </div>
        <div
          onClick={(e) => handleClickDot(e)}
          className="hover:scale-125 transition-all duration-300 text-lg mr-3"
        >
          <IoShareOutline size={24} />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all transition-max-h ease-in-out duration-300 ${
          isWarning ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-3 bg-white mt-5 rounded-lg text-center ">
          <h1 className="text-lg md:text-xl font-semibold">
            Sensitive Content
          </h1>
          <p className="my-3 text-sm md:text-lg">
            This link may contain content that is not appropriate for all
            audiences.
          </p>
          <Button
            onClick={(e) => handleSensitiveContent(e, item)}
            className="bg-black hover:bg-gray-800 w-40 text-sm md:text-lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LinkCard
