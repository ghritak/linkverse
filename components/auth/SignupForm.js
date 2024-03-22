import { Button } from '../button/Button'
import Input from '../input/Input'

const SignupForm = ({
  sendVerificationCode,
  formData,
  handleInputChange,
  errorMessage,
  router
}) => {
  return (
    <>
      <form
        onSubmit={sendVerificationCode}
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
    </>
  )
}

export default SignupForm
