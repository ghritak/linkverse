import { useRouter } from 'next/router'
import LinkCardEdit from '../components/cards/LinkCardEdit'
import Image from 'next/image'
import Button from '../components/button/Button'
import { MdOutlineAddLink } from 'react-icons/md'

const UserProfile = ({ userData }) => {
  const router = useRouter()
  const { username } = router.query

  const handleClickDot = (e) => {
    e.stopPropagation()
  }

  const handleExternalLinkClick = (event, link) => {
    event.preventDefault()
    window.open(link, '_blank')
  }

  return (
    <div className="bg-gradient-to-tr from-gray-500 via-gray-700 to-black w-screen h-screen flex justify-center overflow-hidden">
      <div className="relative max-w-3xl flex flex-col md:min-w-[700px] md:bg-gradient-to-tr from-gray-500 via-gray-700 to-black overflow-y-scroll w-full px-8 md:px-20">
        <div>
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
                  <LinkCardEdit
                    key={index}
                    item={item}
                    handleClickDot={handleClickDot}
                    handleExternalLinkClick={handleExternalLinkClick}
                  />
                )
              })}
          </div>
        </div>

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
  const URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${URL}/api/link?username=${username}`)
  const userData = await res.json()

  return {
    props: {
      userData
    }
  }
}

export default UserProfile
