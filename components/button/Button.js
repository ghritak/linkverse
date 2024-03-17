import React from 'react';

const Button = ({ props, children, disabled, className }) => {
  return (
    <button
      disabled={disabled}
      className={`bg-blue-500 text-white py-2 px-6 rounded-lg transition-all duration-300 ${
        disabled ? 'opacity-50' : 'hover:bg-blue-600 '
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
