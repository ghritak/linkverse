/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FiEdit, FiLogOut } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Button from '../../components/button/Button'
import { getUserProfile } from '../../server-functions/profile/getUserProfile'
import LinkCardEdit from '../../components/cards/LinkCardEdit'
import { postLinks } from '../../server-functions/profile/postLinks'

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
  const [token, setToken] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('USER')
    const token = localStorage.getItem('AUTH_TOKEN')
    if (!user && !token) {
      router.push('/login')
    } else {
      setToken(token)
      fetchUserData(token)
    }
  }, [username])

  const fetchUserData = async (token) => {
    if (username) {
      try {
        const data = await getUserProfile(username, token)
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
    const { value, name } = e.target
    if (name === 'name') {
      setLinks((prevLinks) => {
        const updatedLinks = [...prevLinks]
        updatedLinks[index] = { ...updatedLinks[index], name: value }
        return updatedLinks
      })
    }
    if (name === 'link') {
      setLinks((prevLinks) => {
        const updatedLinks = [...prevLinks]
        updatedLinks[index] = { ...updatedLinks[index], link: value }
        return updatedLinks
      })
    }
  }

  const handleSave = async () => {
    const data = { links }
    if (token && userData) {
      try {
        const response = await postLinks(userData?.user_id, data, token)
        console.log(response)
        setUserData((prev) => ({ ...prev, links: links }))
        setEditMode(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
  }

  const handleAddNewLink = () => {}

  return (
    <div className="bg-gradient-to-tr from-gray-500 via-gray-700 to-black w-screen  h-screen flex justify-center overflow-hidden">
      {!loading ? (
        <>
          {userData ? (
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
                <p className="text-center text-lg mt-4">
                  @{userData?.username}
                </p>
                <h1 className="text-center text-3xl font-semibold">
                  {userData?.name}
                </h1>
                <p className="text-center text-lg mt-4">{userData?.bio}</p>
              </div>

              <div className="mt-20">
                {links &&
                  links.map((item, index) => {
                    return (
                      <LinkCardEdit
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
                {!isEditMode && (
                  <div
                    onClick={handleAddNewLink}
                    className="my-6 w-full text-center  border-[1px] py-3 rounded-lg text-white bg-gray-600 hover:scale-[102%] cursor-pointer transition-all duration-300"
                  >
                    Add new link +
                  </div>
                )}
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
            <div className="h-screen flex flex-col items-center justify-center text-white">
              <p>You aren&apos;t currently logged in as {username}</p>
              <p
                onClick={() => router.push('/login')}
                className="text-blue-500 font-medium cursor-pointer mt-3"
              >
                Click here to log in.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="h-screen flex items-center justify-center text-white">
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default UserProfile
