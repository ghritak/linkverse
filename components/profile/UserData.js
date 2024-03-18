import ProfilePhotoComponent from './ProfilePhotoComponent'

const UserData = ({ userData }) => {
  return (
    <div className="mx-10 mt-14">
      <ProfilePhotoComponent userData={userData} />

      <div className="w-full flex-col justify-center items-center mt-10 text-white">
        <p className="text-center text-lg mt-4">@{userData?.username}</p>
        <h1 className="text-center text-3xl font-semibold">{userData?.name}</h1>
        <p className="text-center text-lg mt-4">{userData?.bio}</p>
      </div>
    </div>
  )
}

export default UserData
