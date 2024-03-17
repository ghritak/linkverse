import { twMerge } from 'tailwind-merge'

const Button = ({
  props,
  children,
  disabled,
  className = '',
  onClick,
  type,
  ref
}) => {
  const classes = twMerge(`
  bg-blue-500 text-white py-2 px-6 rounded-lg transition-all duration-300 ${
    disabled ? 'opacity-50' : 'hover:bg-blue-600 '
  } ${className ?? ''}
  `)
  return (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
