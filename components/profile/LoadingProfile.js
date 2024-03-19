import CustomLoader from '../loading/CustomLoader'

const LoadingProfile = () => {
  return (
    <div className="h-screen w-full  flex items-center justify-center ">
      <CustomLoader color="white" />
    </div>
  )
}

export default LoadingProfile
