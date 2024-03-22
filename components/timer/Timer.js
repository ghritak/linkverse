import { useState, useEffect } from 'react'

const Timer = ({ duration, onClick }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration)

  useEffect(() => {
    const timerID = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1)
      }
    }, 1000)

    return () => clearInterval(timerID)
  }, [secondsLeft])

  const handleClick = () => {
    onClick()
    setSecondsLeft(duration)
  }

  return (
    <div>
      {secondsLeft > 0 ? (
        <p>OTP will expire in {secondsLeft} sec</p>
      ) : (
        <p onClick={handleClick} className="text-blue-500 cursor-pointer ml-3">
          Resend Code
        </p>
      )}
    </div>
  )
}

export default Timer
