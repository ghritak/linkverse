import { twMerge } from 'tailwind-merge'
import CustomLoader from '../loading/CustomLoader'

export const Button = ({
  props,
  children,
  disabled,
  className = '',
  onClick,
  type,
  ref,
  loading = false
}) => {
  const classes = twMerge(`
  bg-blue-500 text-white py-2 px-6 rounded-lg transition-all duration-300 ${
    disabled || loading ? 'bg-blue-400' : 'hover:bg-blue-600 '
  } ${className ?? ''}
  `)
  return (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {!loading ? (
        children
      ) : (
        <div className="flex justify-center">
          <CustomLoader size="26" color="white" />
        </div>
      )}
    </button>
  )
}

export const ButtonOutline = ({
  props,
  children,
  disabled,
  className = '',
  onClick,
  type,
  ref,
  loading = false
}) => {
  const classes = twMerge(`
  bg-blue-500 text-white py-2 px-6 rounded-lg transition-all duration-300 ${
    disabled || loading ? 'opacity-50' : 'hover:bg-blue-600 '
  } ${className ?? ''}
  `)
  return (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {!loading ? (
        children
      ) : (
        <div className="flex justify-center">
          <CustomLoader size="26" color="white" />
        </div>
      )}
    </button>
  )
}
