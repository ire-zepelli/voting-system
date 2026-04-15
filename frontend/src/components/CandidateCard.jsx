import React from "react";

export default function CandidateCard({ name, image, isSelected, onClick }) {
  return (
    <div onClick={onClick} className="relative flex justify-center w-max cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
      <div className={`relative rounded-[20px] w-46 h-74 editorial-shadow pt-24 pb-10 px-8 text-center flex flex-col items-center transition-colors duration-300 ${isSelected ? "bg-gradient-to-b from-[#FFA700] to-[#E58000]" : "bg-[#412039] group-hover:bg-[#4a2441]"}`}>
        <div className="absolute -top-18 left-1/2 -translate-x-1/2 w-[147.3px] h-[220.95px] z-10">
          <div className="relative w-full h-full">
            <img
              alt={name}
              className="w-full h-full rounded-xl object-cover editorial-shadow"
              src={image}
            />
          </div>
        </div>
        <div className="mt-20">
          <h1 className={`text-xl font-thin tracking-wide leading-none mb-4 ${isSelected ? "text-black font-normal" : "text-white"}`}>
            {name}
          </h1>
        </div>
      </div>
    </div>
  );
}
