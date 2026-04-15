import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-gradient-to-b from-[#FFA700] to-[#E58000] text-black font-large py-3 rounded-lg transition-all duration-200 ${disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"} ${className}`}
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      {...props}
    >
      {children}
    </button>
  );
}
