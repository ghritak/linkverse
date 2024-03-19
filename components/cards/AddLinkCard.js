import Image from 'next/image'
import { IoClose } from 'react-icons/io5'

const AddLinkCard = ({ item, index, handleDeleteLink }) => {
  return (
    <div className="flex justify-between items-center my-6 w-full flex-1 border-[1px] p-2 rounded-lg text-white bg-gray-600">
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
      <div className="w-full mx-2">
        <h1 className="">{item?.name}</h1>
        <p>{item?.link}</p>
      </div>
      <div
        onClick={() => handleDeleteLink(index)}
        className="hover:scale-125 transition-all duration-300 text-lg mr-3 cursor-pointer"
      >
        <IoClose size={24} />
      </div>
    </div>
  )
}

export default AddLinkCard
