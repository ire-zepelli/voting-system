import React from "react";
import CandidateCard from "../CandidateCard";

export default function CandidatesBanner({
  title,
  candidates,
  selectedCandidateId,
  onSelectCandidate,
}) {
  return (
    <div className="relative overflow-x-clip overflow-y-visible w-full flex flex-col items-center pt-1 sm:pt-2 pb-2 sm:pb-3 md:pb-4">
      {/* Background Typography */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none w-max text-center">
        <div
          className="text-white opacity-20 font-black tracking-[-0.05em] uppercase whitespace-pre pr-[0.1em]"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(5rem, 18vw, 30rem)",
            fontWeight: "bold",
            lineHeight: title && title.includes("\n") ? 0.85 : 1,
            letterSpacing: "-0.08em",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {title}
        </div>
      </div>

      {/* Candidate Cards Grid - Deeper overlap for a more integrated look */}
      <div className="relative z-10 flex flex-row flex-wrap justify-center gap-x-12 gap-y-12 sm:gap-x-16 sm:gap-y-14 md:gap-x-20 md:gap-y-16 lg:gap-x-24 w-full px-6 sm:px-10 mt-0 sm:mt-1 md:mt-2 lg:mt-3">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            name={candidate.name}
            fname={candidate.fname}
            lname={candidate.lname}
            partylist={candidate.partylist}
            image={candidate.image}
            isSelected={selectedCandidateId === candidate.id}
            onClick={() => onSelectCandidate(candidate.id)}
          />
        ))}
      </div>
    </div>
  );
}
