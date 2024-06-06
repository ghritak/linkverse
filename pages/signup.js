import { useEffect, useState } from 'react'
import Image from 'next/image'
import LinearLoading from '../components/loading/LinearLoading'
import { useRouter } from 'next/router'
import { signup } from '../server-functions/auth/signup'
import SignupForm from '../components/auth/SignupForm'
import VerificationCode from '../components/auth/VerificationCode'
import { sendOtp } from '../server-functions/auth/sendOtp'
import { verifyOtp } from '../server-functions/auth/verifyOtp'
import { checkUserExist } from '../server-functions/auth/checkUserExist'
import Head from 'next/head'

const SignupPage = () => {
  const router = useRouter()

  const { username } = router.query
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isCodeSent, setCodeSent] = useState(false)
  const [otp, setOtp] = useState('')

  useEffect(() => {
    if (username) {
      setFormData((prev) => ({ ...prev, username: username }))
    }
  }, [username])

  const handleInputChange = (e) => {
    if (errorMessage) setErrorMessage('')
    const { name, value, type } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value
    }))
  }

  const sendVerificationCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await checkUserExist({
        email: formData.email,
        username: formData.username
      })
      const data = await sendOtp(formData?.email)
      setCodeSent(true)
      console.log(data.message)
    } catch (error) {
      setErrorMessage(error?.message)
      console.error('Error signing in:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    try {
      console.log(formData.email, otp)
      const verifyRes = await verifyOtp({ otp, email: formData.email })
      console.log(verifyRes)
      const data = await signup(formData)
      router.push('/login')
      console.log(data.message)
    } catch (error) {
      setErrorMessage(error?.message)
      console.error('Error signing in:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-[#f0f4f9]">
      <Head>
        <title>Sign up</title>
      </Head>
      <div
        className={`bg-white w-[1000px] ${
          !isCodeSent ? 'md:h-[480px]' : 'md:h-[340px]'
        } mx-8 sm:mx-[100px] rounded-3xl overflow-hidden`}
      >
        {loading ? <LinearLoading /> : <div className="h-1" />}
        <div className={`md:grid grid-cols-2 ${loading ? 'opacity-50' : ''} `}>
          <div className="col-span-1 m-10">
            <Image
              src="/link128.png"
              alt="Example Image"
              width={46}
              height={46}
            />
            <h1 className="text-4xl my-4">Sign up</h1>
            <p>to create your Linkverse</p>
          </div>

          <div className="col-span-1 h-full flex-1 m-10 md:m-0 md:mt-10 md:mr-10">
            {!isCodeSent ? (
              <SignupForm
                key={formData}
                sendVerificationCode={sendVerificationCode}
                formData={formData}
                handleInputChange={handleInputChange}
                errorMessage={errorMessage}
                router={router}
              />
            ) : (
              <VerificationCode
                otp={otp}
                setOtp={setOtp}
                handleVerify={handleVerify}
                formData={formData}
                errorMessage={errorMessage}
                sendVerificationCode={sendVerificationCode}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignupPage
