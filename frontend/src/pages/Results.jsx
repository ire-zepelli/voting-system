import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ResultsCard from '../components/ResultsCard'
import Footer from '../components/Footer'
import uclmccs from '../assets/uclmccs.png'
import uclmpsits from '../assets/uclmpsits.png'
import Button from '../components/Button'

function Results() {
    const navigate = useNavigate()
    const positions = [
        {
            title: "PRESIDENT",
            candidates: [
                { text: "Daniel Kane Mapano - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "VP - INTERNAL",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "100      %" }
            ]
        },
        {
            title: "VP - EXTERNAL",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "SECRETARY",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "PIO",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "TREASURER",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "CHIEF OF CREATIVES",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "AUDITOR",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "CHIEF OF REPRESENTATIVE",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "CHIEF OF STUDENTS DEVELOPMENT",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "ACADEMIC REPRESENTATIVE",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        }, {
            title: "CARES REPRESENTATIVE",
            candidates: [
                { text: "john Doe - E.I Partylist", voteNum: 150, percentage: "69%" },
                { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        }
    ]

    return (
        <div className='bg-[#3B0B2E]/98 min-h-screen'>
            <Header />
            <main className="flex-grow w-full max-w-[1440px] px-4 sm:px-8 md:px-16 py-6 fade-in-up box-border mx-auto">
                <div className="flex gap-1 mb-1 items-center justify-start ml-1">
                    <img src={uclmccs} alt="UCLM CCS Logo" className="w-[45px] h-auto object-contain" />
                    <img src={uclmpsits} alt="UCLM PSITS Logo" className="w-[45px] h-auto object-contain" />
                </div>
                <h1 className="text-[36px] sm:text-[46px] text-white font-bold tracking-tight mb-12">Results:</h1>

                <div className="flex flex-col w-full text-white">
                    {positions.map((position, index) => (
                        <div key={index} className="mb-10 w-full">
                            <h2 className="text-[24px] sm:text-[28px] font-normal tracking-wide mb-4 whitespace-normal">{position.title}</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 w-full">
                                {position.candidates.map((candidate, candidateIndex) => (
                                    <div key={candidateIndex} className="w-full truncate overflow-hidden bg-transparent">
                                        <ResultsCard
                                            text={candidate.text}
                                            voteNum={candidate.voteNum}
                                            percentage={candidate.percentage}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center w-100 mx-auto my-18'>
                    <Button onClick={() => navigate('/')}>Return to HomePage</Button>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Results
