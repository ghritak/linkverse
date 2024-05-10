/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { BsViewList } from 'react-icons/bs'
import CustomLoader from '../../loading/CustomLoader'
import { themeCodes } from '../../../constants/themeCodes'
import { changeTheme } from '../../../server-functions/profile/changeTheme'
import { IoClose } from 'react-icons/io5'

const ChangeTheme = ({ token, userData, setActivity }) => {
  const [isExpanded, setExpanded] = useState(false)
  const [isUpdating, setUpdating] = useState(false)
  const [themeCode, setThemeCode] = useState(1)

  useEffect(() => {
    setThemeCode(parseInt(userData?.theme))
  }, [userData?.theme])

  const handleChange = async (e) => {
    e.stopPropagation()
    try {
      setUpdating(true)
      const res = await changeTheme(token, userData.email, themeCode)
      console.log(res)
      setUpdating(false)
      setActivity((prev) => ({ ...prev, reRender: prev.reRender + 1 }))
    } catch (error) {
      setUpdating(false)
      console.log('Could not change theme', error)
    }
  }
  return (
    <div className="border-b-[1px] border-gray-700 overflow-hidden">
      <div className="flex items-center overflow-hidden justify-between p-10 border-b-[1px] py-6 border-gray-700 transition-all duration-300">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <div
          onClick={() =>
            setActivity((prev) => ({ ...prev, settingsVisible: false }))
          }
          className="cursor-pointer hover:bg-gray-700 transition-all duration-300 rounded-full p-2"
        >
          <IoClose color="white" size={30} />
        </div>
      </div>

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
          isExpanded
            ? 'h-[520px] xs:h-[400px] md:h-[250px] lg:h-[510px]'
            : 'h-0'
        }`}
      >
        <div className="py-5">
          <div className="flex flex-wrap">
            {themeCodes.map((item) => (
              <div
                key={item.id}
                onClick={() => setThemeCode(item.id)}
                className={`w-16 h-28 xl:w-24 xl:h-44 mr-6 mb-6 rounded-lg cursor-pointer hover:scale-95 transition-transform duration-300 ${
                  item.id === themeCode ? 'border-2 border-blue-500' : ''
                }`}
                style={{ background: item.backgroundColor }}
              />
            ))}
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
