import React from "react";
import test_candidate_picture from "../assets/test_candidate_picture.png";

export default function CandidateCard({
  fname,
  lname,
  image,
  isSelected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="relative flex justify-center w-max cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105 group"
    >
      <div
        className={`relative rounded-[20px] w-46 h-74 editorial-shadow pt-24 pb-10 px-8 text-center flex flex-col items-center transition-colors duration-300 ${isSelected ? "bg-gradient-to-b from-[#FFA700] to-[#E58000]" : "bg-[#412039] group-hover:bg-[#4a2441]"}`}
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-45 h-65 z-10">
          <div className="relative w-full h-full">
            <img
              alt="Candidate"
              className="w-full h-full rounded-xl object-cover editorial-shadow"
              src={image}
            />
          </div>
        </div>
        <div className="mt-20">
          <h1
            className={`text-lg w-40 font-thin tracking-wide leading-none mb-4 ${isSelected ? "text-black font-normal" : "text-white"}`}
          >
            <div className="flex flex-col gap-2 w-full mt-6">
              <span className="text-md font-thin">{fname}</span>
              <span className="text-md font-thin">{lname}</span>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}
