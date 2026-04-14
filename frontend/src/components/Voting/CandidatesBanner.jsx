import React from "react";
import CandidateCard from "../CandidateCard";

export default function CandidatesBanner({ title, candidates, selectedCandidateId, onSelectCandidate }) {
  return (
<div className="relative overflow-hidden w-full flex flex-col items-center pt-4 pb-24 mb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none w-max text-center">
        <div
          className="text-[250px] text-white opacity-40 font-black tracking-[-0.05em] leading-[1.2] uppercase whitespace-pre pr-[0.1em]"
          style={{ fontFamily: "'Inter', sans-serif",            
            fontSize: "clamp(7rem, 20vw, 30rem)",
            fontWeight: "bold",
            lineHeight: 1,
            letterSpacing: "-0.08em",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0, }}
        >
          {title}
        </div>
      </div>
      <div className="relative z-10 flex flex-row flex-wrap justify-center gap-6 md:gap-20 w-full px-4 mt-52">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            name={candidate.name}
            image={candidate.image}
            isSelected={selectedCandidateId === candidate.id}
            onClick={() => onSelectCandidate(candidate.id)}
          />
        ))}
      </div>
    </div>
  );
}
