import ProfilePhotoComponent from './ProfilePhotoComponent'

const UserData = (props) => {
  const { userData, setUserData, activity, setActivity } = props

  const handleInputChange = (e) => {
    if (activity.profileErrorMessage)
      setActivity((prev) => ({ ...prev, profileErrorMessage: '' }))
    const { value, name } = e.target
    let newValue = value
    if (newValue.startsWith('@')) {
      newValue = newValue.substring(1)
    }
    setUserData((prev) => ({ ...prev, [name]: newValue }))
  }

  if (!userData) return null

  return (
    <div className="mx-10 mt-14">
      <ProfilePhotoComponent {...props} />

      <div className="w-full flex-col justify-center items-center mt-10 text-white">
        <div className="text-lg text-center">
          <input
            key={activity.editModeProfile}
            autoFocus={true}
            disabled={!activity.editModeProfile}
            value={`@${userData.username}`}
            name="username"
            className={`outline-none bg-transparent w-full rounded-sm transition-transform duration-300  ${
              activity.editModeProfile
                ? 'border-b-[1px]'
                : 'text-center pb-[1px]'
            }`}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-xl text-center mt-3">
          {activity.editModeProfile ? (
            <input
              key={activity.editModeProfile}
              disabled={!activity.editModeProfile}
              value={userData.name}
              name="name"
              className={`outline-none bg-transparent font-semibold w-full rounded-sm transition-transform duration-300  ${
                activity.editModeProfile
                  ? 'border-b-[1px]'
                  : 'text-center pb-[1px]'
              }`}
              onChange={handleInputChange}
            />
          ) : (
            <p className="font-semibold">{userData.name}</p>
          )}
        </div>
        <div className="text-center mt-3">
          {activity.editModeProfile ? (
            <input
              key={activity.editModeProfile}
              disabled={!activity.editModeProfile}
              value={userData.bio}
              name="bio"
              className={`outline-none bg-transparent w-full rounded-sm transition-transform duration-300  ${
                activity.editModeProfile
                  ? 'border-b-[1px]'
                  : 'text-center pb-[1px]'
              }`}
              onChange={handleInputChange}
            />
          ) : (
            <p>{userData.bio}</p>
          )}
        </div>
        {activity?.profileErrorMessage && (
          <p className="text-sm mt-4 text-red-400">
            {activity?.profileErrorMessage}
          </p>
        )}
      </div>
    </div>
  )
}

export default UserData
