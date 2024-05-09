/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiEdit, FiLogOut } from 'react-icons/fi'

const MenuComponent = ({
  activity,
  handleCancel,
  handleEditLinks,
  handleEditProfile,
  handleLogout,
  menuRef,
  setActivity
}) => {
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target.id !== 'menuButton'
    ) {
      setActivity((prev) => ({ ...prev, menuVisible: false }))
    }
  }

  return (
    <>
      <div className="absolute top-6 right-8 md:right-20 z-50">
        {!(activity.editModeLinks || activity.editModeProfile) ? (
          <button
            onClick={() =>
              setActivity((prev) => ({
                ...prev,
                menuVisible: !activity.menuVisible
              }))
            }
            id="menuButton"
            className=" cursor-pointer hover:scale-95 hover:bg-white hover:text-black border-[1px] flex items-center justify-center text-white rounded-full p-2 transition-all duration-300"
          >
            <span id="menuButton">
              <BsThreeDotsVertical id="menuButton" />
            </span>
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="hover:bg-white z-50 text-white z-50 hover:text-black rounded-2xl hover:bg-transparent border-[1px] transition-all duration-300 px-4 py-1"
          >
            Cancel
          </button>
        )}
      </div>

      <div
        ref={menuRef}
        className={`absolute top-16 right-10 md:right-24 text-black transition-opacity duration-200 bg-white rounded-md z-20 ${
          activity.menuVisible ? '' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={handleEditProfile}
          className="flex items-center p-2.5 w-40 border-b-[1px] cursor-pointer hover:bg-gray-200 rounded-t-md transition-all duration-300 justify-between"
        >
          <p className="mr-2">Edit Profile</p>
          <FiEdit />
        </div>
        <div
          onClick={handleEditLinks}
          className="flex items-center p-2.5 w-40 border-b-[1px] cursor-pointer hover:bg-gray-200 rounded-t-md transition-all duration-300 justify-between"
        >
          <p className="mr-2">Edit Links</p>
          <FiEdit />
        </div>
        <div
          onClick={() => {
            setActivity((prev) => ({
              ...prev,
              settingsVisible: !activity.settingsVisible,
              menuVisible: false
            }))
          }}
          className="flex items-center p-2.5 w-40 border-b-[1px] cursor-pointer hover:bg-gray-200 rounded-t-md transition-all duration-300 justify-between"
        >
          <p className="mr-2">Settings</p>
          <FiEdit />
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center p-2.5 w-40  cursor-pointer hover:bg-gray-200 rounded-b-md transition-all duration-300 justify-between"
        >
          <p className="mr-2">Log out </p>
          <FiLogOut />
        </div>
      </div>
    </>
  )
}

export default MenuComponent
