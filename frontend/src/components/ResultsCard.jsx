import React from "react";

function ResultsCard({ text, voteNum, percentage }) {
  return (
    <div className="bg-[#4F1F73] h-[220px] w-full rounded-xl flex flex-col justify-center gap-5 px-6 py-6">
      <p className="text-xl sm:text-2xl font-medium sm:mb-5 leading-snug">
        {text}
      </p>
      <div className="flex flex-row justify-between items-center w-full mt-auto">
        <p className="text-lg sm:text-xl font-medium truncate">
          {voteNum} Votes
        </p>
        <p className="text-lg sm:text-xl font-medium text-gray-400 shrink-0">
          {percentage}
        </p>
      </div>
      <div className="h-4 w-full bg-[#3B0B2E] rounded-full overflow-hidden shadow-inner mb-2">
        {/* Dynamic Fill */}
        <div
          style={{ width: `${percentage}` }}
          className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"
        />
      </div>
    </div>
  );
}

export default ResultsCard;
