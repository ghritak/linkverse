import { useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiEdit, FiLogOut } from 'react-icons/fi'

const MenuComponent = ({
  isEditMode,
  menuVisible,
  handleCancel,
  setMenuVisible,
  handleEditProfile,
  handleLogout,
  menuRef
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
      setMenuVisible(false)
    }
  }

  return (
    <>
      <div className="absolute top-6 right-8 md:right-20">
        {!isEditMode ? (
          <button
            onClick={() => setMenuVisible(!menuVisible)}
            id="menuButton"
            className=" cursor-pointer hover:scale-95 bg-white hover:text-black flex items-center justify-center text-white rounded-full p-2 transition-all duration-300"
          >
            <span id="menuButton">
              <BsThreeDotsVertical id="menuButton" color="black" />
            </span>
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="bg-white z-50 hover:text-white rounded-2xl hover:bg-transparent border-[1px] transition-all duration-300 px-4 py-1"
          >
            Cancel
          </button>
        )}
      </div>
      <div
        ref={menuRef}
        className={`absolute top-16 right-10 md:right-24 text-black transition-opacity duration-200 bg-white rounded-md z-20 ${
          menuVisible ? '' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={handleEditProfile}
          className="flex items-center p-2.5 w-32 border-b-[1px] cursor-pointer hover:bg-gray-200 rounded-t-md transition-all duration-300 justify-between"
        >
          <p className="mr-2">Edit Links</p>
          <FiEdit />
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center p-2.5 w-32  cursor-pointer hover:bg-gray-200 rounded-b-md transition-all duration-300 justify-between"
        >
          <p className="mr-2">Log out </p>
          <FiLogOut />
        </div>
      </div>
    </>
  )
}

export default MenuComponent

// <>
// <div className="absolute top-6 right-8 md:right-20">
//   {!isEditMode ? (
//     <button
//       onClick={() => setMenuVisible(!menuVisible)}
//       id="menuButton"
//       className=" cursor-pointer hover:scale-95 bg-white hover:text-black flex items-center justify-center text-white rounded-full p-2 transition-all duration-300"
//     >
//       <span id="menuButton">
//         <BsThreeDotsVertical id="menuButton" color="black" />
//       </span>
//     </button>
//   ) : (
//     <button
//       onClick={handleCancel}
//       className="bg-white hover:text-white rounded-2xl hover:bg-transparent border-[1px] transition-all duration-300 px-4 py-1"
//     >
//       Cancel
//     </button>
//   )}
// </div>
// <div
//   ref={menuRef}
//   className={`absolute top-16 right-10 md:right-24 text-black transition-opacity duration-200 bg-white rounded-md z-20 ${
//     menuVisible ? '' : 'opacity-0 pointer-events-none'
//   }`}
// >
//   <div
//     onClick={handleEditProfile}
//     className="flex items-center p-2.5 w-32 border-b-[1px] cursor-pointer hover:bg-gray-200 rounded-t-md transition-all duration-300 justify-between"
//   >
//     <p className="mr-2">Edit Links</p>
//     <FiEdit />
//   </div>
//   <div
//     onClick={handleLogout}
//     className="flex items-center p-2.5 w-32  cursor-pointer hover:bg-gray-200 rounded-b-md transition-all duration-300 justify-between"
//   >
//     <p className="mr-2">Log out </p>
//     <FiLogOut />
//   </div>
// </div>
// </>
