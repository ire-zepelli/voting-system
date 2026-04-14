  import React from 'react';

export default function Button({ children, onClick, type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-gradient-to-b from-[#FFA700] to-[#E58000] hover:opacity-90 text-black font-large py-3 rounded-lg cursor-pointer transition-all duration-200 ${className}`}
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      {...props}
    >
      {children}
    </button>
  );
}
