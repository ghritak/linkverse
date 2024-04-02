import { useState } from 'react'
import { BsViewList } from 'react-icons/bs'
import CustomLoader from '../../loading/CustomLoader'

const ChangeTheme = () => {
  const [isExpanded, setExpanded] = useState(false)
  const [isUpdating, setUpdating] = useState(false)

  const handleChange = async (e) => {
    e.stopPropagation()
    try {
      //pass
      setUpdating(true)
      setTimeout(() => {
        console.log('clicked')
        setUpdating(false)
      }, 3000)
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
          <BsViewList className="mr-4" size={20} />
          <p>Change Theme</p>
        </div>
      </div>
      <div
        className={` transition-all duration-300 mx-8 ${
          isExpanded ? 'h-[560px]' : 'h-0'
        }`}
      >
        <div className="py-5">
          <div className="flex flex-wrap">
            <div className="bg-gradient-to-tr from-gray-500 via-gray-700 to-black w-24 h-44 mr-6 mb-6 rounded-lg cursor-pointer hover:scale-95 transition-all duration-300 border-2 border-blue-600" />
            <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-700 w-24 h-44 mr-6 mb-6 rounded-lg cursor-pointer hover:scale-95 transition-all duration-300" />
            <div className="bg-gradient-to-tr from-yellow-500 via-[#D3F517] to-green-400 w-24 h-44 mr-6 mb-6 rounded-lg cursor-pointer hover:scale-95 transition-all duration-300" />
            <div className="bg-gradient-to-br from-white via-gray-300 to-gray-600 w-24 h-44 mr-6 mb-6 rounded-lg cursor-pointer hover:scale-95 transition-all duration-300" />
            <div className="bg-gradient-to-tr from-blue-100 via-blue-400 to-blue-700 w-24 h-44 mr-6 mb-6 rounded-lg cursor-pointer hover:scale-95 transition-all duration-300" />
            <div className="bg-gradient-to-tr from-teal-200 via-teal-500 to-teal-800 w-24 h-44 mr-6 mb-6 rounded-lg cursor-pointer hover:scale-95 transition-all duration-300" />
            <div className="bg-gradient-to-tr from-sky-500 via-sky-700 to-sky-950 w-24 h-44 mr-6 mb-6 rounded-lg cursor-pointer hover:scale-95 transition-all duration-300" />
            <div className="bg-gradient-to-tr from-pink-200 via-pink-500 to-pink-700 w-24 h-44 mr-6 mb-6 rounded-lg cursor-pointer hover:scale-95 transition-all duration-300" />
          </div>
          <div className="text-sm">
            <p>Are you sure you want to delete your account?</p>
            <p className="mt-2">This can&apos;t be reversible.</p>
          </div>
          <div
            className={`flex items-center space-x-3 mt-5 overflow-hidden ${
              isExpanded ? 'h-full' : 'h-0'
            }`}
          >
            <button
              disabled={isUpdating}
              onClick={handleChange}
              className={`h-9 w-44 items-center justify-center flex rounded-lg  ${
                isUpdating ? 'opacity-60' : 'hover:bg-blue-600 cursor-pointer'
              } transition-all duration-300 bg-blue-500`}
            >
              {!isUpdating ? (
                'Save Changes'
              ) : (
                <CustomLoader size="20" color="white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeTheme
