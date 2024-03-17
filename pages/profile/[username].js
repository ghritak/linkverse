/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { getUser } from '../../server-functions/profile/getUser'
import Image from 'next/image'
import { FiEdit, FiLogOut } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Button from '../../components/button/Button'
import LinkCard from '../../components/cards/LinkCard'

const UserProfile = () => {
  const router = useRouter()
  const { username } = router.query
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [menuVisible, setMenuVisible] = useState(false)
  const menuRef = useRef(null)
  const [isEditMode, setEditMode] = useState(false)
  const [links, setLinks] = useState([])
  const [renderLinView, setRenderLinkView] = useState(0)

  useEffect(() => {
    const user = localStorage.getItem('USER')
    if (!user) {
      router.push('/login')
    } else {
      fetchUserData()
    }
  }, [username])

  const fetchUserData = async () => {
    if (username) {
      try {
        const data = await getUser(username)
        console.log(data)
        setUserData(data)
        setLinks(data?.links)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }
  }

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

  const handleExternalLinkClick = (event, link) => {
    event.preventDefault()
    if (isEditMode) return
    window.open(link, '_blank')
  }

  const handleClickDot = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // alert('he');
  }

  const handleEditProfile = () => {
    setMenuVisible(false)
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditMode(false)
    setLinks(userData?.links)
    setRenderLinkView((prev) => prev + 1)
  }

  const handleLogout = () => {
    setMenuVisible(false)
    const confirmed = window.confirm('Are you sure you want to logout ?')
    if (confirmed) {
      localStorage.clear()
      router.push('/login')
      console.log('User confirmed logout')
    }
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target
    setLinks((prevLinks) => {
      const updatedLinks = [...prevLinks]
      updatedLinks[index] = { ...updatedLinks[index], name: value }
      return updatedLinks
    })
  }

  const handleSave = () => {
    console.log(links)
  }

  return (
    <div className="bg-gradient-to-tr from-gray-500 via-gray-700 to-black w-screen  h-screen flex justify-center overflow-hidden">
      {!loading ? (
        <div className="relative max-w-3xl  md:min-w-[700px] md:bg-gradient-to-tr from-gray-500 via-gray-700 to-black overflow-y-scroll w-full px-8 md:px-20">
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
                className="bg-white hover:text-white rounded-2xl hover:bg-transparent border-[1px] transition-all duration-300 px-4 py-1"
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
              className="flex items-center p-2.5 w-28 border-b-[1px] cursor-pointer hover:bg-gray-200 rounded-t-md transition-all duration-300 justify-between"
            >
              <p className="mr-2">Edit </p>
              <FiEdit />
            </div>
            <div
              onClick={handleLogout}
              className="flex items-center p-2.5 w-28  cursor-pointer hover:bg-gray-200 rounded-b-md transition-all duration-300 justify-between"
            >
              <p className="mr-2">Log out </p>
              <FiLogOut />
            </div>
          </div>

          <div className="w-full flex justify-center mt-10">
            {userData && userData?.profile_photo ? (
              <Image
                src={item.logo}
                alt="Link logo"
                width={64}
                height={64}
                className="w-10 h-10"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-300 rounded-full animate-pulse"></div>
            )}
          </div>

          <div className="w-full flex-col justify-center items-center mt-10 text-white">
            <p className="text-center text-lg mt-4">@{userData?.username}</p>
            <h1 className="text-center text-3xl font-semibold">
              {userData?.name}
            </h1>
            <p className="text-center text-lg mt-4">{userData?.bio}</p>
          </div>

          <div className="mt-20">
            {links.map((item, index) => {
              return (
                <LinkCard
                  key={index}
                  index={index}
                  item={item}
                  handleExternalLinkClick={handleExternalLinkClick}
                  isEditMode={isEditMode}
                  handleInputChange={handleInputChange}
                  handleClickDot={handleClickDot}
                  renderLinView={renderLinView}
                />
              )
            })}
          </div>
          {isEditMode && (
            <div className="absolute flex-1 w-full bottom-10 left-0 px-10 sm:px-20">
              <Button onClick={handleSave} className={'w-full py-3'}>
                Save
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center text-white">
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default UserProfile
