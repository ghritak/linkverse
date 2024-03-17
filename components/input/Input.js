import React, { useRef } from 'react';
import './Input.module.css';

const Input = (props) => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div
      onClick={focusInput}
      className='relative group focus-within:border-blue-500 border-2 border-gray-300 rounded-lg p-3 mb-4 focus:bg-red-300 cursor-text '
    >
      <div
        onClick={focusInput}
        className='absolute left-2 group-focus-within:-translate-y-6  group-focus-within:text-xs group-focus-within:text-blue-500 transition-all duration-3000 ease-in-out bg-white px-2'
      >
        <label
          className='cursor-text'
          style={{ transform: 'translateY(-50%)' }}
          htmlFor={props.label}
        >
          {props.label}
        </label>
      </div>
      <input ref={inputRef} {...props} className='w-full outline-none z-10 ' />
    </div>
  );
};

export default Input;
