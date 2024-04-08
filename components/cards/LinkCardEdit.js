import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoLink, IoClose, IoShareOutline } from 'react-icons/io5'
import { getThemeColor } from '../../utils'

const LinkCardEdit = ({
  item,
  index,
  activity,
  handleInputChange,
  handleClickDot,
  renderLinView,
  handleDeleteLink,
  userData
}) => {
  const [isLinkView, setLinkView] = useState(false)

  useEffect(() => {
    setLinkView(false)
  }, [renderLinView])

  const handleExternalLinkClick = (event, item) => {
    event.preventDefault()
    if (activity.editModeLinks) return
    window.open(item.link, '_blank')
  }

  return (
    <div
      key={userData?.theme}
      onClick={(e) => handleExternalLinkClick(e, item)}
      className={`flex justify-between items-center my-6 w-full flex-1 border-[1px] p-2 rounded-lg text-white ${
        activity.editModeLinks ? '' : 'hover:scale-[102%] cursor-pointer'
      } transition-all duration-300`}
      style={{ backgroundColor: getThemeColor(userData?.theme) }}
    >
      {item.logo ? (
        <Image
          src={item.logo}
          alt="Link logo"
          width={64}
          height={64}
          className="w-10 h-10"
        />
      ) : (
        <div className="w-11 h-10 mx-1 bg-gray-300 animate-pulse rounded-lg"></div>
      )}
      <div className="w-full">
        {!activity.editModeLinks ? (
          <h1 className="text-center mx-2">{item?.name}</h1>
        ) : (
          <div className="w-full flex items-center justify-center">
            {!isLinkView ? (
              <input
                autoFocus={activity.editModeLinks && index === 0}
                disabled={!activity.editModeLinks}
                value={item?.name}
                name="name"
                className="bg-gray-600  outline-none mx-3 w-full rounded-sm pl-1"
                onChange={(e) => handleInputChange(e, index)}
              />
            ) : (
              <input
                autoFocus={activity.editModeLinks && index === 0}
                disabled={!activity.editModeLinks}
                value={item?.link}
                name="link"
                className="bg-gray-600  outline-none mx-3 w-full rounded-sm pl-1"
                onChange={(e) => handleInputChange(e, index)}
              />
            )}
          </div>
        )}
      </div>
      {!activity.editModeLinks ? (
        <div
          onClick={(e) => handleClickDot(e)}
          className="hover:scale-125 transition-all duration-200 text-lg mr-3"
        >
          <IoShareOutline size={24} />
        </div>
      ) : (
        <div className="flex items-center">
          <div
            onClick={() => setLinkView(!isLinkView)}
            className={`hover:scale-[115%] transition-all rounded-full duration-200 text-lg mr-3 p-1 cursor-pointer ${
              isLinkView ? 'bg-white text-black' : ''
            }`}
          >
            <IoLink size={24} />
          </div>
          <div
            onClick={() => handleDeleteLink(index)}
            className="hover:scale-[115%] transition-all rounded-full duration-200 text-lg mr-3 p-1 cursor-pointer"
          >
            <IoClose size={24} />
          </div>
        </div>
      )}
    </div>
  )
}

export default LinkCardEdit
