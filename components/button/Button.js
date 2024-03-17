import React from 'react';

const Button = ({ props, children }) => {
  return (
    <div>
      <button
        className='bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300'
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
