import React from "react";

export default function NxtBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-50 px-6 py-2 bg-gradient-to-r from-[#ff9500] to-[#b37c00] text-black font-normal rounded-full transition-all duration-300 shadow-md hover:scale-105 hover:shadow-[0_0_15px_rgba(255,149,0,0.6)] hover:brightness-110 active:scale-95">
      Next
    </button>
  );
}