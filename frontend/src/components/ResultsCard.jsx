import React from "react";

function ResultsCard({ text, voteNum, percentage }) {
  // Extract and clean data
  const rawText = text || '';
  const parts = rawText.split(" - ");
  const name = parts[0];
  const partyContainer = parts.length > 1 ? parts[1] : "";
  
  // Some parties in standard text say 'Partylistv' or 'Partylist'
  const party = partyContainer.replace(/partylistv?/i, '').trim(); 

  const isBeats = party.toLowerCase().includes("b.e.a.t.s");
  const isPeak = party.toLowerCase().includes("p.e.a.k");
  
  const progressBarGradient = isBeats 
    ? "from-pink-500 to-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.6)]" 
    : isPeak
      ? "from-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
      : "from-purple-500 to-indigo-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]";
      
  const partyAccentColor = isBeats 
    ? "bg-rose-500/20 text-rose-200 border-rose-500/30" 
    : isPeak 
      ? "bg-cyan-500/20 text-cyan-200 border-cyan-500/30" 
      : "bg-white/10 text-gray-200 border-white/20";

  // Clean percentage text (e.g. "100      %" to "100%")
  const cleanPercentage = (percentage || '0%').toString().replace(/\s/g, '');

  return (
    <div className="group relative bg-[#4F1F73]/80 hover:bg-[#5C2785] transition-all duration-300 w-full rounded-2xl flex flex-col justify-between gap-5 p-6 sm:p-8 border border-white/10 hover:border-white/30 overflow-hidden shadow-lg hover:shadow-2xl h-full min-h-[180px] sm:min-h-[220px]">
      {/* Background glow effect based on party */}
      <div className={`absolute -bottom-10 -right-10 w-40 h-40 blur-[80px] rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-50 ${isBeats ? 'bg-pink-600' : isPeak ? 'bg-cyan-600' : 'bg-purple-600'} pointer-events-none`}></div>
      
      <div className="relative z-10 flex flex-col gap-3">
        <p className="text-xl sm:text-2xl font-bold text-white leading-snug break-words drop-shadow-md">
          {name}
        </p>
        {party && (
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm self-start border ${partyAccentColor}`}>
            {party}
          </span>
        )}
      </div>
      
      <div className="mt-8 relative z-10">
        <div className="flex flex-row justify-between items-end w-full mb-3">
          <div className="flex flex-col">
            <p className="text-gray-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1 opacity-80">
              Total Votes
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white leading-none drop-shadow-md">
              {voteNum}
            </p>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white/90 shrink-0 tracking-tighter drop-shadow-lg">
            {cleanPercentage}
          </p>
        </div>
        
        <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden shadow-inner p-[2px]">
          <div
            style={{ width: `${cleanPercentage}` }}
            className={`h-full bg-gradient-to-r ${progressBarGradient} transition-all duration-1000 ease-out rounded-full`}
          />
        </div>
      </div>
    </div>
  );
}

export default ResultsCard;
