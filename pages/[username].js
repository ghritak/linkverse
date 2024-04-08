import { useRouter } from 'next/router'
import LinkCard from '../components/cards/LinkCard'
import Image from 'next/image'
import { Button } from '../components/button/Button'
import { MdOutlineAddLink } from 'react-icons/md'
import { getUser } from '../server-functions/profile/getUser'
import { getThemeBackgroundColor } from '../utils'
import { useState } from 'react'

const UserProfile = ({ userData }) => {
  const router = useRouter()
  const { username } = router.query
  const [isImageAvailable, setImageAvailable] = useState(true)

  const handleClickDot = (e) => {
    e.stopPropagation()
  }

  return (
    <div
      className="w-screen h-screen flex justify-center overflow-hidden"
      style={{
        background: getThemeBackgroundColor(userData?.theme)
      }}
    >
      <div className="relative max-w-3xl flex flex-col md:min-w-[700px]  overflow-y-scroll w-full px-8 md:px-20">
        {userData ? (
          <div>
            <div className="w-full flex justify-center mt-10">
              {userData && userData?.profile_photo ? (
                <>
                  {isImageAvailable ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${userData?.profile_photo}`}
                      alt=""
                      placeholder="blur"
                      blurDataURL={`${process.env.NEXT_PUBLIC_API_URL}${userData?.profile_photo}`}
                      width={80}
                      height={80}
                      className="w-40 h-40 rounded-full bg-gray-200"
                      style={{ objectFit: 'cover' }}
                      onError={() => setImageAvailable(false)}
                    />
                  ) : (
                    <Image
                      src="/user.png"
                      alt=""
                      width={80}
                      height={80}
                      className="w-40 h-40 rounded-full bg-gray-200"
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </>
              ) : (
                <div className="w-40 h-40 bg-gray-300 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="w-full flex-col justify-center items-center mt-10 text-white">
              <p className="text-center text-lg mt-4">@{username}</p>
              <h1 className="text-center text-3xl font-semibold">
                {userData?.name}
              </h1>
              <p className="text-center text-lg mt-4">{userData?.bio}</p>
            </div>

            <div className="mt-20">
              {userData &&
                userData.links.map((item, index) => {
                  return (
                    <LinkCard
                      key={index}
                      item={item}
                      userData={userData}
                      handleClickDot={handleClickDot}
                    />
                  )
                })}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <h1 className="text-6xl">404</h1>
            <p className="mt-2">User &quot;{username}&quot; not found</p>
          </div>
        )}

        <div className="flex flex-col justify-center items-center w-full bottom-10 left-0 px-10 sm:px-20 mt-auto">
          <Button
            onClick={() => {
              router.push('/signup')
            }}
            className="py-3 px-10 flex items-center rounded-3xl"
          >
            Create your linkverse
            <MdOutlineAddLink size={22} className="ml-1" />
          </Button>
          <div className="text-white my-3">
            Already have an account ?{' '}
            <span
              onClick={() => {
                router.push('/login')
              }}
              className="text-blue-500 font-medium cursor-pointer"
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { username } = params

  try {
    const userData = await getUser(username)
    return {
      props: {
        userData
      }
    }
  } catch (error) {
    return {
      props: {
        error: error.message
      }
    }
  }
}

export default UserProfile
