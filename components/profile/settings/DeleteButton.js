import { useState } from 'react'
import { deleteAccount } from '../../../server-functions/profile/deleteAccount'
import { MdOutlineDeleteSweep } from 'react-icons/md'
import { useRouter } from 'next/router'

const DeleteButton = ({ token, userData }) => {
  const [isWarned, setWarned] = useState(false)
  const router = useRouter()

  const handleClose = (e) => {
    e.stopPropagation()
    setWarned(false)
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    try {
      const res = await deleteAccount(userData.email, token)
      router.push('/login')
      console.log(res)
    } catch (error) {
      console.log('Could not delete account', error)
    }
  }

  return (
    <div
      onClick={() => setWarned(true)}
      className={`border-b-[1px] border-gray-700 h-20 px-8 flex items-center justify-between   transition-all duration-300 ${
        isWarned ? '' : 'md:hover:bg-gray-800 cursor-pointer active:bg-gray-800'
      }`}
    >
      <div className="flex items-center">
        <MdOutlineDeleteSweep className="mr-4" size={22} />
        <p>Delete Account</p>
      </div>
      <div
        className={`flex items-center space-x-3 overflow-hidden ${
          isWarned ? 'h-full' : 'h-0'
        }`}
      >
        <div
          onClick={handleClose}
          className={
            'px-8 py-1 rounded-lg cursor-pointer hover:bg-green-600 transition-all duration-300  bg-green-500'
          }
        >
          No
        </div>
        <div
          onClick={handleDelete}
          className="px-8 py-1 rounded-lg cursor-pointer hover:bg-red-600 transition-all duration-300 bg-red-500"
        >
          Yes
        </div>
      </div>
    </div>
  )
}

export default DeleteButton
