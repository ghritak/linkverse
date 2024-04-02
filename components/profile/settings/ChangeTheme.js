import { MdOutlineDeleteSweep } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ChangeTheme = () => {
  const [isExpanded, setExpanded] = useState(false)
  const router = useRouter()

  const handleClose = (e) => {
    e.stopPropagation()
    setExpanded(false)
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    try {
      //   const res = await deleteAccount(userData.email, token)
      router.push('/login')
      //   console.log(res)
    } catch (error) {
      console.log('Could not delete account', error)
    }
  }
  return (
    <div className="border-b-[1px] border-gray-700 overflow-hidden">
      <div
        onClick={() => setExpanded(!isExpanded)}
        className="h-20 px-8 flex items-center justify-between md:hover:bg-gray-800 cursor-pointer active:bg-gray-800 transition-all duration-300"
      >
        <div className="flex items-center">
          <MdOutlineDeleteSweep className="mr-4" size={22} />
          <p>Change Theme</p>
        </div>
      </div>
      <div
        className={` transition-all duration-300 mx-8 ${
          isExpanded ? 'h-36' : 'h-0'
        }`}
      >
        <div className="py-5">
          <div className="text-sm">
            <p>Are you sure you want to delete your account?</p>
            <p className="mt-2">This can&apos;t be reversible.</p>
          </div>
          <div
            className={`flex items-center space-x-3 mt-5 overflow-hidden ${
              isExpanded ? 'h-full' : 'h-0'
            }`}
          >
            <div
              onClick={handleClose}
              className={
                'px-8 py-1 rounded-lg cursor-pointer hover:bg-green-600 transition-all duration-300  bg-green-500 font-medium'
              }
            >
              No
            </div>
            <div
              onClick={handleDelete}
              className="px-8 py-1 rounded-lg cursor-pointer hover:bg-red-600 transition-all duration-300 bg-red-500 font-medium"
            >
              Yes
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeTheme
