// import React, { useRef, useState } from 'react';

// const Input = (props) => {
//   const inputRef = useRef(null);
//   const [isInputFocused, setIsInputFocused] = useState(false);

//   const focusInput = () => {
//     inputRef.current.focus();
//     setIsInputFocused(true);
//   };

//   const blurInput = () => {
//     if (!inputRef.current.value.trim()) {
//       setIsInputFocused(false);
//     }
//   };

//   return (
//     <div
//       onClick={focusInput}
//       className={`relative group border-2 border-gray-300 rounded-lg p-3 mb-4 bg-white cursor-text ${
//         isInputFocused ? 'focus-within:border-blue-500' : ''
//       }`}
//     >
//       <div
//         className={`absolute left-2 ${
//           isInputFocused ? '-top-3 text-sm text-blue-500' : 'top-3'
//         } transition-all duration-200  bg-white px-2`}
//       >
//         <label
//           className='cursor-text'
//           style={{ transform: 'translateY(-50%)' }}
//           htmlFor={props.label}
//         >
//           {props.label}
//         </label>
//       </div>
//       <input
//         ref={inputRef}
//         {...props}
//         className='w-full outline-none z-10'
//         onFocus={focusInput}
//         onBlur={blurInput}
//       />
//     </div>
//   );
// };

// export default Input;

import React, { useRef, useState } from 'react';

const Input = (props) => {
  const inputRef = useRef(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const focusInput = () => {
    inputRef.current.focus();
    setIsInputFocused(true);
  };

  const blurInput = () => {
    if (!inputRef.current.value.trim()) {
      setIsInputFocused(false);
    }
  };

  return (
    <div
      onClick={focusInput}
      className={`relative group -lg mb-4 bg-white cursor-text ${
        isInputFocused ? 'focus-within:border-blue-500' : ''
      }`}
    >
      <div
        className={`absolute left-2 ${
          isInputFocused ? '-top-3 text-sm text-blue-500' : 'top-[13px]'
        } transition-all duration-200  bg-white px-2`}
      >
        <label
          className='cursor-text'
          style={{ transform: 'translateY(-50%)' }}
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
      />
    </div>
  );
};

export default Input;
