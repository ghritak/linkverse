import { useState } from 'react'
import { deleteAccount } from '../../../server-functions/profile/deleteAccount'
import { FaRotate } from 'react-icons/fa6'

import { useRouter } from 'next/router'
import Input from '../../input/Input'
import CustomLoader from '../../loading/CustomLoader'
import { sendOtp } from '../../../server-functions/auth/sendOtp'

const ChangePassword = ({ userData }) => {
  const [isExpanded, setExapanded] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleDelete = async (e) => {
    e.stopPropagation()
    try {
      console.log('hello')
    } catch (error) {
      console.log('Could not delete account', error)
    }
  }

  const handleInputChange = (e) => {
    const { value, name } = e.target
    if (errorMessage) setErrorMessage('')
    if (name === 'password') setPassword(value)
    if (name === 'password2') setPassword2(value)
  }

  const sendVerificationCode = async () => {
    if (password !== password2) {
      setErrorMessage('Password didnt match')
      return
    }
    setLoading(true)
    try {
      const data = await sendOtp(formData?.email)
      console.log('OTP send succesfully.')
      setLoading(false)
    } catch (error) {
      console.log('Could not send verification code.', error)
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
          isExpanded ? 'h-64' : 'h-0'
        }`}
      >
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
          <p className="text-red-400 text-sm h-9">{errorMessage}</p>
          <button
            disabled={loading}
            onClick={sendVerificationCode}
            className={`h-9 w-24  items-center justify-center flex rounded-lg cursor-pointer ${
              loading ? 'opacity-60' : 'hover:bg-blue-600'
            } transition-all duration-300 bg-blue-500`}
          >
            {!loading ? 'Next' : <CustomLoader size="20" color="white" />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
