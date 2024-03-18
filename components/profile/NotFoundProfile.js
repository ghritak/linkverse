const NotFoundProfile = ({ username, router }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <p>You aren&apos;t currently logged in as {username}</p>
      <p
        onClick={() => router.push('/login')}
        className="text-blue-500 font-medium cursor-pointer mt-3"
      >
        Click here to log in.
      </p>
    </div>
  )
}

export default NotFoundProfile
