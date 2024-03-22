import { useState } from 'react'
import { FaRotate } from 'react-icons/fa6'

import Input from '../../input/Input'
import CustomLoader from '../../loading/CustomLoader'
import { sendOtp } from '../../../server-functions/auth/sendOtp'
import { verifyOtp } from '../../../server-functions/auth/verifyOtp'
import { changePassword } from '../../../server-functions/profile/changePassword'

const ChangePassword = ({ userData }) => {
  const [isExpanded, setExapanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isOtpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')

  const handleInputChange = (e) => {
    const { value, name } = e.target
    if (errorMessage) setErrorMessage('')
    if (name === 'password') setPassword(value)
    if (name === 'password2') setPassword2(value)
    if (name === 'otp') setOtp(value)
  }

  const sendVerificationCode = async () => {
    if (password !== password2) {
      setErrorMessage('Password didnt match.')
      return
    }
    if (password === '') {
      setErrorMessage('Password is Invalid.')
      return
    }
    setLoading(true)
    try {
      await sendOtp(userData?.email)
      setOtpSent(true)
      console.log('OTP send succesfully.')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setErrorMessage(error?.message)
      console.log('Could not send verification code.', error)
    }
  }

  const handleVerify = async (e) => {
    e.stopPropagation()
    setLoading(true)
    try {
      await verifyOtp({ otp, email: userData.email })
      await changePassword({ email: userData.email, password })
      console.log('Password changed succesfully.')
      setLoading(false)
    } catch (error) {
      setErrorMessage(error?.message)
      setLoading(false)
      console.log('Could not change password', error)
    }
  }

  return (
    <div className="border-b-[1px] border-gray-700 overflow-hidden">
      <div
        onClick={() => setExapanded(!isExpanded)}
        className="h-20 px-8 flex items-center justify-between  transition-all duration-300 md:hover:bg-gray-800 cursor-pointer active:bg-gray-800"
      >
        <div className="flex items-center">
          <FaRotate className="mr-4" size={18} />
          <p>Change Password</p>
        </div>
      </div>
      <div
        className={` transition-all duration-300 mx-8 ${
          isExpanded ? 'h-60' : 'h-0'
        }`}
      >
        {!isOtpSent ? (
          <div className="py-6">
            <div>
              <Input
                label={'New Password'}
                name="password"
                value={password}
                onChange={handleInputChange}
                backgroundColor={'#1a1f27'}
              />
              <Input
                label={'Confirm Password'}
                name="password2"
                value={password2}
                onChange={handleInputChange}
                backgroundColor={'#1a1f27'}
              />
            </div>
            <div>
              <p className="text-red-400 text-sm h-9 absolute right-8">
                {errorMessage}
              </p>
              <button
                disabled={loading}
                onClick={sendVerificationCode}
                className={`h-9 w-24 mt-5 items-center justify-center flex rounded-lg cursor-pointer ${
                  loading ? 'opacity-60' : 'hover:bg-blue-600'
                } transition-all duration-300 bg-blue-500`}
              >
                {!loading ? 'Next' : <CustomLoader size="20" color="white" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="py-5">
            <div>
              <p className="text-xl font-medium ">Verification Code</p>
              <p className="my-5 text-sm">
                A 6-digit verification code has been sent your email &quot;
                {userData?.email}&quot;
              </p>
              <Input
                label={'Verification Code'}
                name="otp"
                value={otp}
                onChange={handleInputChange}
                backgroundColor={'#1a1f27'}
                maxLength={6}
              />
            </div>
            <div>
              <p className="text-red-400 text-sm h-9 absolute right-8">
                {errorMessage}
              </p>
              <button
                disabled={loading}
                onClick={handleVerify}
                className={`h-9 w-24 mt-5 items-center justify-center flex rounded-lg cursor-pointer ${
                  loading ? 'opacity-60' : 'hover:bg-blue-600'
                } transition-all duration-300 bg-blue-500`}
              >
                {!loading ? 'Verify' : <CustomLoader size="20" color="white" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChangePassword
