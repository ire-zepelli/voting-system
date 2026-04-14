import React from 'react'
import Header from '../components/Header'
import ResultsCard from '../components/ResultsCard'

function Results() {
    const positions = [
        {
            title: "PRESIDENT",
            candidates: [
                {text: "Daniel Kane Mapano - E.I Partylist", voteNum: 150, percentage: "69%"},
                {text: "John Doe - PDP", voteNum: 150, percentage: "69%"}
            ]
        },
        {
            title: "VP - INTERNAL",
            candidates: [
                {text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%"},
                {text: "John Doe - PDP", voteNum: 150, percentage: "69%"}
            ]
        },
        {
            title: "VP - EXTERNAL",
            candidates: [
                {text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%"},
                {text: "John Doe - PDP", voteNum: 150, percentage: "69%"}
            ]
        }
    ]

    return (
        <div className='bg-[#3B0B2E]/98 min-h-screen'>
            <Header />
            <div className='w-full flex flex-col text-white px-20 py-10'>
                <div className='flex flex-row gap-5 mb-5'>
                    <img src="" alt="CCS Logo" className='w-15 h-15 border border-black' />
                    <img src="" alt="PSITS Logo" className='w-15 h-15 border border-black' />
                </div>
                <h1 className='text-7xl font-bold'>Results:</h1>

                <div className='flex flex-col  m-5 mt-10'>
                    {positions.map((position, index) => (
                        <div key={index}>
                            <h1 className='text-5xl mt-10'>{position.title}</h1>
                            <div className='flex flex-row gap-20 mt-5'>
                                {position.candidates.map((candidate, candidateIndex) => (
                                    <ResultsCard
                                        key={candidateIndex}
                                        text={candidate.text}
                                        voteNum={candidate.voteNum}
                                        percentage={candidate.percentage}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    )
}

export default Results
