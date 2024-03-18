/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '../../components/button/Button'
import { getUserProfile } from '../../server-functions/profile/getUserProfile'
import LinkCardEdit from '../../components/cards/LinkCardEdit'
import { postLinks } from '../../server-functions/profile/postLinks'
import MenuComponent from '../../components/profile/MenuComponent'
import UserData from '../../components/profile/UserData'
import LoadingProfile from '../../components/profile/LoadingProfile'
import NotFoundProfile from '../../components/profile/NotFoundProfile'

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
  const [loadingSaving, setLoadingSaving] = useState(false)

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
      setLoadingSaving(true)
      try {
        const response = await postLinks(userData?.user_id, data, token)
        console.log(response)
        setUserData((prev) => ({ ...prev, links: links }))
        setEditMode(false)
        setLoadingSaving(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setLoadingSaving(false)
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
              <MenuComponent
                isEditMode={isEditMode}
                menuVisible={menuVisible}
                handleCancel={handleCancel}
                setMenuVisible={setMenuVisible}
                handleEditProfile={handleEditProfile}
                handleLogout={handleLogout}
                menuRef={menuRef}
              />

              <UserData userData={userData} />

              <div className="mt-20">
                {links &&
                  links.map((item, index) => {
                    return (
                      <LinkCardEdit
                        key={index}
                        index={index}
                        item={item}
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
                  <Button
                    loading={loadingSaving}
                    onClick={handleSave}
                    className={'w-full h-12'}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <NotFoundProfile username={username} router={router} />
          )}
        </>
      ) : (
        <LoadingProfile />
      )}
    </div>
  )
}

export default UserProfile
