import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoLink, IoShareOutline } from 'react-icons/io5'

const LinkCardEdit = ({
  item,
  index,
  handleExternalLinkClick,
  isEditMode,
  handleInputChange,
  handleClickDot,
  renderLinView
}) => {
  const [isLinkView, setLinkView] = useState(false)

  useEffect(() => {
    setLinkView(false)
  }, [renderLinView])

  return (
    <div
      onClick={(e) => handleExternalLinkClick(e, item.link)}
      className={`flex justify-between items-center my-6 w-full flex-1 border-[1px] p-2 rounded-lg text-white bg-gray-600 ${
        isEditMode ? '' : 'hover:scale-[102%] cursor-pointer'
      } transition-all duration-300`}
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
        <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-lg"></div>
      )}
      <div className="w-full">
        {!isEditMode ? (
          <h1 className="text-center mx-2">{item?.name}</h1>
        ) : (
          <div className="w-full flex items-center justify-center">
            {!isLinkView ? (
              <input
                autoFocus={isEditMode && index === 0}
                disabled={!isEditMode}
                value={item?.name}
                name="name"
                className="bg-gray-600  outline-none mx-3 w-full"
                onChange={(e) => handleInputChange(e, index)}
              />
            ) : (
              <input
                autoFocus={isEditMode && index === 0}
                disabled={!isEditMode}
                value={item?.link}
                name="link"
                className="bg-gray-600  outline-none mx-3 w-full"
                onChange={(e) => handleInputChange(e, index)}
              />
            )}
          </div>
        )}
      </div>
      {!isEditMode ? (
        <div
          onClick={(e) => handleClickDot(e)}
          className="hover:scale-125 transition-all duration-200 text-lg mr-3"
        >
          <IoShareOutline size={24} />
        </div>
      ) : (
        <div
          onClick={() => setLinkView(!isLinkView)}
          className={`hover:scale-[115%] transition-all rounded-full duration-200 text-lg mr-3 p-1 cursor-pointer ${
            isLinkView ? 'bg-white text-black' : ''
          }`}
        >
          <IoLink size={24} />
        </div>
      )}
    </div>
  )
}

export default LinkCardEdit
