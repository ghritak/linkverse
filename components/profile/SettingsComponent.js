import { IoClose } from 'react-icons/io5'

const SettingsComponent = ({ setActivity }) => {
  return (
    <div className="text-white">
      <div>
        <div className="flex items-center justify-between p-10 border-b-[1px] pb-5 border-gray-700">
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
        {/* <div className="w-full h-screen bg-[#212630]"></div> */}
        <div></div>
      </div>
    </div>
  )
}

export default SettingsComponent
