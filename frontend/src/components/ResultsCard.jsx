import React from 'react'

function ResultsCard({text,voteNum,percentage}) {
  return (
    <div className='bg-[#4F1F73] h-55 w-170 rounded-xl flex flex-col gap-5 px-6 pt-10'>
      <p className='text-2xl font-medium mb-5'>{text}</p>
      <div className='flex flex-row gap-120'>
        <p className='text-xl font-medium'>{voteNum} Votes</p>
        <p className='text-xl font-medium text-gray-400'>{percentage}</p>
      </div>
      <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden shadow-inner">
        {/* Dynamic Fill */}
        <div
          style={{ width: `${percentage}%` }}
          className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"
        />
      </div>
    </div>
  )
}

export default ResultsCard
