import { useState } from 'react'
import Input from '../components/input/Input'
import Image from 'next/image'
import { Button } from '../components/button/Button'
import LinearLoading from '../components/loading/LinearLoading'
import { useRouter } from 'next/router'
import { sendOtp } from '../server-functions/auth/sendOtp'
import { isValidEmail } from '../utils'
import { verifyOtp } from '../server-functions/auth/verifyOtp'
import Timer from '../components/timer/Timer'
import CustomLoader from '../components/loading/CustomLoader'
import { TbDiscountCheckFilled } from 'react-icons/tb'
import { changePassword } from '../server-functions/profile/changePassword'

const linkButton = 'text-blue-600 font-medium cursor-pointer'

const LoginPage = () => {
  const router = useRouter()
  const [activity, setActivity] = useState({
    email: '',
    errorMessage: '',
    isOtpSent: false,
    loading: false,
    errorMessage: '',
    password: '',
    password2: '',
    otp: '',
    isOtpVerified: false,
    isPasswordChanged: false
  })

  const handleInputChange = (e) => {
    const { value, name } = e.target
    if (activity.errorMessage)
      setActivity((prev) => ({ ...prev, errorMessage: '' }))
    setActivity((prev) => ({ ...prev, [name]: value }))
  }

  const sendVerificationCode = async () => {
    if (!isValidEmail(activity.email)) {
      setActivity((prev) => ({
        ...prev,
        errorMessage: 'Invalid Email'
      }))
      return
    }
    setActivity((prev) => ({ ...prev, loading: true }))
    try {
      await sendOtp(activity.email)
      console.log('OTP send succesfully.')
      setActivity((prev) => ({ ...prev, isOtpSent: true, loading: false }))
    } catch (error) {
      setActivity((prev) => ({
        ...prev,
        errorMessage: error?.message,
        loading: false
      }))
      console.log('Could not send verification code.', error)
    }
  }

  const handleVerify = async (e) => {
    e.stopPropagation()
    setActivity((prev) => ({ ...prev, loading: true }))
    try {
      await verifyOtp({ otp: activity.otp, email: activity.email })
      console.log('OTP Verified succesfully.')
      setActivity((prev) => ({ ...prev, loading: false, isOtpVerified: true }))
    } catch (error) {
      setActivity((prev) => ({
        ...prev,
        errorMessage: error?.message,
        loading: false
      }))
      console.log('Could not verify otp', error)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (activity.password !== activity.password2) {
      setActivity((prev) => ({
        ...prev,
        errorMessage: 'Password didnt match.'
      }))
      return
    }
    if (activity.password === '') {
      setActivity((prev) => ({ ...prev, errorMessage: 'Password is invalid.' }))
      return
    }
    setActivity((prev) => ({ ...prev, loading: true }))
    try {
      await changePassword({
        email: activity.email,
        password: activity.password
      })
      console.log('Password changed succesfully.')
      setActivity((prev) => ({
        ...prev,
        loading: false,
        isPasswordChanged: true
      }))
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (error) {
      setActivity((prev) => ({
        ...prev,
        errorMessage: error?.message,
        loading: false
      }))
      console.log('Could not verify otp', error)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f0f4f9]">
      <div className="bg-white w-[1000px] md:h-[300px] mx-8 sm:mx-[100px] rounded-3xl overflow-hidden">
        {activity.loading ? <LinearLoading /> : <div className="h-1" />}
        <div
          className={`md:grid grid-cols-2  ${
            activity.loading ? 'opacity-50' : ''
          } `}
        >
          <div className="col-span-1 m-10">
            <Image
              src="/link128.png"
              alt="Example Image"
              width={46}
              height={46}
            />
            <h1 className="text-2xl font-medium my-4">Linking Your World.</h1>
            <p>One Click, Infinite Connections!</p>
          </div>

          {!activity.isOtpSent ? (
            <form
              onSubmit={sendVerificationCode}
              className="col-span-1  flex-1 m-10 md:m-0 md:mt-10 md:mr-10"
            >
              <div className="h-full">
                <Input
                  label="Email"
                  type="text"
                  name="email"
                  value={activity.email}
                  onChange={handleInputChange}
                  required
                />
                {activity.errorMessage && (
                  <p className="text-red-400 text-sm mb-2">
                    {activity.errorMessage}
                  </p>
                )}
                <div className="mt-5 text-sm">
                  <span className={linkButton}>
                    Learn more about using linkverse
                  </span>
                  <p className=" mt-1">
                    Go back to{' '}
                    <span
                      onClick={() => router.push('/login')}
                      className={linkButton}
                    >
                      Log in
                    </span>
                    , Or go to{' '}
                    <span
                      onClick={() => router.push('/signup')}
                      className={linkButton}
                    >
                      Sign up
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-10 md:mt-auto">
                <Button
                  type={'submit'}
                  disabled={activity.loading}
                  onClick={sendVerificationCode}
                >
                  Next
                </Button>
              </div>
            </form>
          ) : !activity.isOtpVerified ? (
            <form
              onSubmit={verifyOtp}
              className="col-span-1  flex-1 m-10 md:m-0 md:mt-10 md:mr-10"
            >
              <div>
                <p className="text-xl font-medium ">Verification Code</p>
                <p className="my-5 text-sm">
                  A 6-digit verification code has been sent to your email &quot;
                  {activity?.email}&quot;
                </p>
                <Input
                  label={'Verification Code'}
                  name="otp"
                  value={activity.otp}
                  onChange={handleInputChange}
                  maxLength={6}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  disabled={activity.loading}
                  onClick={handleVerify}
                  className={`h-9 w-24 text-white items-center justify-center flex rounded-lg cursor-pointer ${
                    activity.loading ? 'opacity-60' : 'hover:bg-blue-600'
                  } transition-all duration-300 bg-blue-500`}
                >
                  {!activity.loading ? (
                    'Verify'
                  ) : (
                    <CustomLoader size="20" color="white" />
                  )}
                </button>
                <div>
                  <p className="text-red-400 text-sm text-right">
                    {activity.errorMessage}
                  </p>
                  <div className="items-center flex justify-end mt-1">
                    {activity.isOtpSent && (
                      <Timer duration={60} onClick={sendVerificationCode} />
                    )}
                  </div>
                </div>
              </div>
            </form>
          ) : !activity.isPasswordChanged ? (
            <form
              onSubmit={handleChangePassword}
              className="col-span-1  flex-1 m-10 md:m-0 md:mt-10 md:mr-10"
            >
              <div>
                <Input
                  label={'New Password'}
                  name="password"
                  value={activity.password}
                  onChange={handleInputChange}
                />
                <Input
                  label={'Confirm Password'}
                  name="password2"
                  value={activity.password2}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="text-red-400 text-sm h-9 absolute right-8">
                  {activity.errorMessage}
                </p>
                <button
                  disabled={activity.loading}
                  onClick={handleChangePassword}
                  className={`h-9 w-24 text-white mt-5 items-center justify-center flex rounded-lg cursor-pointer ${
                    activity.loading ? 'opacity-60' : 'hover:bg-blue-600'
                  } transition-all duration-300 bg-blue-500`}
                >
                  {!activity.loading ? (
                    'Change Password'
                  ) : (
                    <CustomLoader size="20" color="white" />
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="md:h-[300px] flex-1 justify-center items-center flex flex-col ">
              <TbDiscountCheckFilled size={60} color="green" />
              <p className="mt-4">Password changed succesfully.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
