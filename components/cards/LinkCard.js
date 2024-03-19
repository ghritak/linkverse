import Image from 'next/image'
import { IoShareOutline } from 'react-icons/io5'

const LinkCard = ({ item, handleClickDot }) => {
  const handleExternalLinkClick = (event, item) => {
    event.preventDefault()
    if (item.sensitive) {
      return
    }
    window.open(item.link, '_blank')
  }

  return (
    <div
      onClick={(e) => handleExternalLinkClick(e, item)}
      className="flex justify-between items-center my-6 w-full flex-1 border-[1px] p-2 rounded-lg text-white bg-gray-600 hover:scale-[102%] cursor-pointer transition-all duration-300"
    >
      {item.logo ? (
        <Image
          src={item.logo}
          alt="Link logo"
          width={10}
          height={10}
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
  )
}

export default LinkCard
