import { useState } from 'react'
import Input from '../components/input/Input'
import Image from 'next/image'
import Button from '../components/button/Button'
import LinearLoading from '../components/loading/LinearLoading'
import { useRouter } from 'next/router'
import { signup } from '../server-functions/auth/signup'

const SignupPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    if (errorMessage) setErrorMessage('')
    const { name, value, type } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value
    }))
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
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
    <div className="w-screen h-screen flex justify-center items-center bg-[#f0f4f9]">
      <div className="bg-white w-[1000px] md:h-[480px] mx-8 sm:mx-[100px] rounded-3xl overflow-hidden">
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
            <form
              onSubmit={handleSignup}
              className="h-full flex flex-col justify-between"
            >
              <div>
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="User Name"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {errorMessage && (
                  <p className="text-red-400 text-sm -mb-3">{errorMessage}</p>
                )}
                <div className="mt-5">
                  <p className="text-sm">
                    Already have an account ?{' '}
                    <span
                      onClick={() => router.push('/login')}
                      className="text-blue-600 font-medium cursor-pointer"
                    >
                      Log in
                    </span>
                    <br />
                    <span className="text-blue-600 font-medium cursor-pointer">
                      Learn more about using linkverse
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-10 md:mt-auto">
                <Button type="submit">Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
