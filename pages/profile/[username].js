/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '../../components/button/Button'
import { getUserProfile } from '../../server-functions/profile/getUserProfile'
import LinkCardEdit from '../../components/cards/LinkCardEdit'
import { postLinks } from '../../server-functions/profile/postLinks'
import MenuComponent from '../../components/profile/MenuComponent'
import UserData from '../../components/profile/UserData'
import LoadingProfile from '../../components/profile/LoadingProfile'
import NotFoundProfile from '../../components/profile/NotFoundProfile'
import AddNewLink from '../../components/profile/AddNewLink'
import { updateProfile } from '../../server-functions/profile/updateProfile'
import SettingsComponent from '../../components/profile/settings/SettingsComponent'
import { getThemeBackgroundColor } from '../../utils'
import Head from 'next/head'

const UserProfile = () => {
  const router = useRouter()
  const { username } = router.query
  const [loading, setLoading] = useState(true)
  const menuRef = useRef(null)
  const [userData, setUserData] = useState(null)
  const [links, setLinks] = useState([])
  const [renderLinView, setRenderLinkView] = useState(0)
  const [token, setToken] = useState(null)
  const [loadingSaving, setLoadingSaving] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [activity, setActivity] = useState({
    menuVisible: false,
    editModeLinks: false,
    editModeProfile: false,
    userData: null,
    reRender: 0,
    profileErrorMessage: '',
    settingsVisible: false,
    background: 'bg-gradient-to-tr from-gray-500 via-gray-700 to-black'
  })

  useEffect(() => {
    const user = localStorage.getItem('USER')
    const token = localStorage.getItem('AUTH_TOKEN')
    if (!user && !token) {
      router.push('/login')
    } else {
      setToken(token)
      fetchUserData(token)
    }
  }, [username, activity.reRender])

  const fetchUserData = async (token) => {
    if (username) {
      try {
        const data = await getUserProfile(username, token)
        const background = getThemeBackgroundColor(data?.theme)
        setActivity((prev) => ({
          ...prev,
          userData: data,
          background: background
        }))
        setUserData({
          name: data.name,
          email: data.email,
          username: data.username,
          bio: data.bio,
          theme: data?.theme || '1'
        })
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
  }

  const handleEditLinks = () => {
    setActivity((prev) => ({
      ...prev,
      editModeLinks: true,
      menuVisible: false
    }))
  }

  const handleEditProfile = () => {
    setActivity((prev) => ({
      ...prev,
      editModeProfile: true,
      menuVisible: false
    }))
  }

  const handleCancel = () => {
    setActivity((prev) => ({
      ...prev,
      editModeLinks: false,
      editModeProfile: false
    }))
    setLinks(activity?.userData?.links)
    setUserData({
      name: activity?.userData?.name,
      email: activity?.userData?.email,
      username: activity?.userData?.username,
      bio: activity?.userData?.bio
    })
    setRenderLinkView((prev) => prev + 1)
  }

  const handleDeleteLink = (index) => {
    const confirmed = window.confirm('Are you sure you want to delete ?')
    if (confirmed) {
      const newLinks = [...links]
      newLinks.splice(index, 1)
      setLinks(newLinks)
    }
  }

  const handleLogout = () => {
    setActivity((prev) => ({ ...prev, menuVisible: false }))
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

  const handleSaveLinks = async (links) => {
    const data = { links }
    if (token && activity?.userData) {
      setLoadingSaving(true)
      try {
        const response = await postLinks(
          activity?.userData?.user_id,
          data,
          token
        )
        console.log(response)
        setActivity((prev) => ({
          ...prev,
          editModeLinks: false,
          reRender: prev.reRender + 1
        }))
        setLoadingSaving(false)
        if (isModalOpen) setModalOpen(false)
      } catch (error) {
        console.error('Error saving links:', error)
        setLoadingSaving(false)
      }
    }
  }

  const handleSaveProfile = async (data) => {
    if (token && data) {
      setLoadingSaving(true)
      try {
        const response = await updateProfile(token, data)
        console.log(response)
        if (activity?.userData?.username !== data?.username) {
          router.push(`/profile/${data.username}`)
        } else {
          setActivity((prev) => ({ ...prev, reRender: prev.reRender + 1 }))
        }
        setActivity((prev) => ({ ...prev, editModeProfile: false }))
        setLoadingSaving(false)
        if (isModalOpen) setModalOpen(false)
      } catch (error) {
        setActivity((prev) => ({ ...prev, profileErrorMessage: error.message }))
        console.error('Error fetching user data:', error)
        setLoadingSaving(false)
      }
    }
  }

  return (
    <div className="flex w-screen">
      <Head>
        <title>Profile</title>
      </Head>
      <div
        className={`flex-1 min-h-screen flex justify-center transition-all duration-300 ${
          activity.settingsVisible
            ? 'w-0 -translate-x-96 lg:translate-x-0 lg:w-full'
            : 'w-full translate-x-0'
        }`}
        style={{
          background: getThemeBackgroundColor(activity?.userData?.theme)
        }}
      >
        {!loading ? (
          <>
            {userData ? (
              <div className="relative max-w-3xl  md:min-w-[700px] w-full ">
                <div className=" px-8 md:px-20 ">
                  <MenuComponent
                    activity={activity}
                    handleCancel={handleCancel}
                    handleEditLinks={handleEditLinks}
                    handleEditProfile={handleEditProfile}
                    handleLogout={handleLogout}
                    menuRef={menuRef}
                    setActivity={setActivity}
                  />

                  <UserData
                    userData={userData}
                    setUserData={setUserData}
                    token={token}
                    activity={activity}
                    setActivity={setActivity}
                  />

                  <div
                    className={`flex-1 w-full bottom-4 md:bottom-10 left-0 px-10 mt-6 transition-opacity duration-200 ${
                      activity.editModeProfile
                        ? 'opacity-100 visible'
                        : 'opacity-0 invisible'
                    }`}
                  >
                    <Button
                      loading={loadingSaving}
                      onClick={() => handleSaveProfile(userData)}
                      className={'w-full h-12'}
                    >
                      Save Profile
                    </Button>
                  </div>

                  <div
                    className={`pb-10 transition-all duration-300 ${
                      activity.editModeProfile
                        ? 'translate-y-0'
                        : '-translate-y-12'
                    }`}
                  >
                    {links &&
                      links.map((item, index) => {
                        return (
                          <LinkCardEdit
                            key={index}
                            index={index}
                            item={item}
                            userData={userData}
                            activity={activity}
                            handleInputChange={handleInputChange}
                            handleClickDot={handleClickDot}
                            renderLinView={renderLinView}
                            handleDeleteLink={handleDeleteLink}
                          />
                        )
                      })}
                    {!(activity.editModeLinks || activity.editModeProfile) && (
                      <AddNewLink
                        links={links}
                        userData={userData}
                        loadingSaving={loadingSaving}
                        isModalOpen={isModalOpen}
                        setModalOpen={setModalOpen}
                        handleSaveLinks={handleSaveLinks}
                      />
                    )}
                  </div>
                </div>
                {activity.editModeLinks && (
                  <div className="absolute flex-1 w-full bottom-4 md:bottom-10 left-0 px-10 sm:px-20 ">
                    <Button
                      loading={loadingSaving}
                      onClick={() => handleSaveLinks(links)}
                      className={'w-full h-12'}
                    >
                      Save Links
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
      <div
        className={`${
          activity.settingsVisible ? 'w-full lg:w-[400px] xl:w-[600px]' : 'w-0'
        }  bg-[#1a1f27] transition-all duration-300 z-50`}
      >
        <SettingsComponent
          activity={activity}
          setActivity={setActivity}
          token={token}
          userData={userData}
        />
      </div>
    </div>
  )
}

export default UserProfile
