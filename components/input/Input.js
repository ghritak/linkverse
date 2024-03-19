import { useRef, useState } from 'react'
import Color from '../../styles/Colors'

const Input = ({ backgroundColor, color, ...props }) => {
  const inputRef = useRef(null)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const focusInput = () => {
    inputRef.current.focus()
    setIsInputFocused(true)
  }

  const blurInput = () => {
    if (!inputRef.current.value.trim()) {
      setIsInputFocused(false)
    }
  }

  return (
    <div
      onClick={focusInput}
      className={`relative group -lg mb-4  cursor-text ${
        isInputFocused ? 'focus-within:border-blue-500' : ''
      }`}
    >
      <div
        className={`absolute left-2 ${
          isInputFocused ? '-top-2 text-xs text-blue-500' : 'top-[13px]'
        } transition-all duration-200  px-2`}
        style={{ backgroundColor: backgroundColor || 'white' }}
      >
        <label
          className="cursor-text"
          style={{
            transform: 'translateY(-50%)',
            color: isInputFocused ? Color.primary : color
          }}
          htmlFor={props.label}
        >
          {props.label}
        </label>
      </div>
      <input
        ref={inputRef}
        {...props}
        className={`w-full outline-none z-10 p-3 border-[1px] border-gray-400 rounded-lg ${
          isInputFocused
            ? 'focus-within:border-blue-500 border-[2px]'
            : 'm-[1px]'
        }`}
        onFocus={focusInput}
        onBlur={blurInput}
        style={{ backgroundColor: backgroundColor, color: color }}
      />
    </div>
  )
}

export default Input
