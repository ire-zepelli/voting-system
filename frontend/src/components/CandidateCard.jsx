import React from "react";

export default function CandidateCard({
  name,
  fname,
  lname,
  image,
  isSelected,
  onClick,
}) {
  const firstName = fname || name;
  const lastName = lname || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  /**
   * Optimized for No-Scroll (Single Screen):
   * Reduced max height to ensure visibility within viewports.
   * Maintained 80:65 portrait-to-card ratio.
   */

  return (
    <div
      onClick={onClick}
      className="relative flex justify-center cursor-pointer transition-all duration-300 hover:-translate-y-4 hover:scale-105 group"
      style={{
        // Shorter height to fit in viewport
        width: "clamp(240px, 35vw, 420px)",
        height: "clamp(340px, 48vw, 550px)",
      }}
    >
      {/* ── Card Body ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 rounded-[25px] editorial-shadow text-center flex flex-col items-center transition-colors duration-300 ${
          isSelected
            ? "bg-gradient-to-b from-[#FFA700] to-[#E58000]"
            : "bg-[#412039] group-hover:bg-[#4a2441]"
        }`}
        style={{ height: "65%" }}
      >
        {/* Name section - Compact for shorter height */}
        <div className="mt-auto pb-4 sm:pb-6 md:pb-8 w-full px-6">
          <h1
            className={`w-full font-thin tracking-wide leading-tight ${
              isSelected ? "text-black font-normal" : "text-white"
            }`}
          >
            <div className="flex flex-col gap-0.5 w-full">
              <span 
                style={{ fontSize: "clamp(0.85rem, 2.2vw, 1.2rem)" }} 
                className="font-medium tracking-tight"
              >
                {firstName}
              </span>
              {lastName && (
                <span 
                  style={{ fontSize: "clamp(0.85rem, 2.2vw, 1.2rem)" }} 
                  className="font-medium tracking-tight"
                >
                  {lastName}
                </span>
              )}
            </div>
          </h1>
        </div>
      </div>

      {/* ── Candidate Image ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 group-hover:scale-105"
        style={{
          width: "92%",
          height: "80%", // Clear names rule preserved
          pointerEvents: "none",
        }}
      >
        <div className="relative w-full h-full">
          <img
            alt={fullName}
            className="w-full h-full rounded-2xl object-cover editorial-shadow"
            style={{ objectPosition: "top center" }}
            src={image}
          />
        </div>
      </div>
    </div>
  );
}
