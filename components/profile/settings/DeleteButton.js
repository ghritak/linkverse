import { useState } from 'react'

const DeleteButton = ({ icon }) => {
  const [isWarned, setWarned] = useState(false)

  const handleClose = (e) => {
    e.stopPropagation()
    setWarned(false)
  }

  const handleDelete = async () => {
    try {
    } catch (error) {}
  }

  return (
    <div
      onClick={() => setWarned(true)}
      className={`border-b-[1px] border-gray-700 h-20 px-8 flex items-center justify-between   transition-all duration-300 ${
        isWarned ? '' : 'md:hover:bg-gray-800 cursor-pointer active:bg-gray-800'
      }`}
    >
      <div className="flex items-center">
        {icon}
        <p>Delete Account</p>
      </div>
      {isWarned && (
        <div className="flex items-center space-x-3">
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
      )}
    </div>
  )
}

export default DeleteButton
