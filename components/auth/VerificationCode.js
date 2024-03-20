import { Button } from '../button/Button'
import Input from '../input/Input'
import { IoMailUnreadOutline } from 'react-icons/io5'

const VerificationCode = ({
  handleVerify,
  errorMessage,
  otp,
  setOtp,
  formData
}) => {
  return (
    <>
      <form onSubmit={handleVerify} className="h-full">
        <div>
          <div>
            <div className="mb-4 flex items-center">
              <IoMailUnreadOutline className="w-7 h-7 mr-2" />
              <h1 className="font-medium text-lg md:text-2xl text-gray-700">
                Verify Email
              </h1>
            </div>
            <div className="my-5">
              <p className="text-sm md:text-md">
                Please enter the 6-digit verification code that was send to your
                email address{' '}
                <span className="font-semibold">
                  {formData.email || 'example@email.com'}
                </span>
              </p>
            </div>
          </div>
          <Input
            label="Verification Code"
            type="text"
            name="name"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength="6"
          />
          {errorMessage && (
            <p className="text-red-400 text-sm -mb-6">{errorMessage}hello</p>
          )}
        </div>
        <div className="mt-10">
          <Button type="submit">Verify</Button>
        </div>
      </form>
    </>
  )
}

export default VerificationCode
