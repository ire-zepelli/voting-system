import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ResultsCard from '../components/ResultsCard'
import Footer from '../components/Footer'
import uclmccs from '../assets/uclmccs.png'
import uclmpsits from '../assets/uclmpsits.png'
import Button from '../components/Button'

const FadeInOnScroll = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 },
        );

        const current = domRef.current;
        if (current) observer.observe(current);
        return () => current && observer.unobserve(current);
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-700 ease-out will-change-transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[60px]"
                }`}
        >
            {children}
        </div>
    );
};

function Results() {
    const navigate = useNavigate()
    const positions = [
        {
            title: "PRESIDENT",
            candidates: [
                { text: "Crista Monica Oscar - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                { text: "Darren Villanueva - P.E.A.K Partylist", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "VP - INTERNAL",
            candidates: [
                { text: "Dan Pierre Pogoy - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                { text: "Altheia Dano - P.E.A.K Partylist", voteNum: 150, percentage: "100      %" }
            ]
        },
        {
            title: "VP - EXTERNAL",
            candidates: [
                { text: "Ryan Pacumio - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                { text: "Kane Huxley Book - P.E.A.K Partylist", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "SECRETARY",
            candidates: [
                { text: "May Lapeña - B.E.A.T.S Partylistv", voteNum: 150, percentage: "69%" },
                { text: "Diane Mendoza - P.E.A.K Partylist", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "PIO",
            candidates: [
                { text: "Fiona Monilar - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                { text: "Jea Mary Trixy Magallanes - P.E.A.K Partylist", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "TREASURER",
            candidates: [
                { text: "Keith Ramises Latonio - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                { text: "Hanny Jane Enriquez - P.E.A.K Partylist", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "CHIEF OF CREATIVES",
            candidates: [
                { text: "Harry Conde - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                { text: "Tristhan Mark Vincent Villamor - P.E.A.K Partylist", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "AUDITOR",
            candidates: [
                { text: "Emmanuel Franz Apawan - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                { text: "Myka Angela Dumael - P.E.A.K Partylist", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "CHIEF OF REPRESENTATIVE",
            candidates: [
                { text: "Jhoviegen Cuysona - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                { text: "Abijah Shen Regado - P.E.A.K Partylist", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "CHIEF OF STUDENTS DEVELOPMENT",
            candidates: [
                { text: "Aimee Gayle Cogal - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                { text: "Jeoff Andrew Demecillo - P.E.A.K Partylist", voteNum: 150, percentage: "69%" }
            ]
        },
        {
            title: "ACADEMIC REPRESENTATIVE",
            candidates: [
                { text: "Rose Anne Resureccion - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                // { text: "John Doe - PDP", voteNum: 150, percentage: "69%" }
            ]
        }, {
            title: "CARES REPRESENTATIVE",
            candidates: [
                { text: "Mary Grace Patalinghug - B.E.A.T.S Partylist", voteNum: 150, percentage: "69%" },
                { text: "Nathaniel Ornopia - P.E.A.K Partylist", voteNum: 150, percentage: "69%" }
            ]
        }
    ]

    return (
        <div className='bg-[#3B0B2E]/98 min-h-screen flex flex-col'>
            <Header />
            <main className="flex-grow w-full max-w-[1280px] px-4 sm:px-8 md:px-12 py-10 mx-auto box-border xl:pt-16">
                {/* Page Header */}
                <div className="flex flex-col items-center justify-center text-center mb-16 sm:mb-24 fade-in-up mt-8">
                    <div className="flex gap-4 mb-6 items-center justify-center">
                        <img src={uclmccs} alt="UCLM CCS Logo" className="w-[60px] md:w-[80px] h-auto object-contain drop-shadow-lg" />
                        <img src={uclmpsits} alt="UCLM PSITS Logo" className="w-[60px] md:w-[80px] h-auto object-contain drop-shadow-lg" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-tight mb-4 drop-shadow-lg">
                        Election Results
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mt-2 font-medium">
                        Live results for the PSITS 2026 Student Council Elections. Thank you for making your voice heard.
                    </p>
                </div>

                <div className="flex flex-col w-full mx-auto max-w-5xl">
                    {positions.map((position, index) => (
                        <FadeInOnScroll key={index}>
                            <div className="mb-16 sm:mb-20 w-full relative">
                                {/* Position Title with styling */}
                                <div className="flex items-center gap-4 mb-8 sm:mb-10">
                                    <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-white/20"></div>
                                    <h2 className="text-[20px] sm:text-[26px] md:text-[30px] font-bold tracking-widest uppercase text-[#FFD700] whitespace-nowrap px-4 ">
                                        {position.title}
                                    </h2>
                                    <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-white/20"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full px-2">
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
                        </FadeInOnScroll>
                    ))}
                </div>

                <div className="flex items-center justify-center w-full mt-10 mb-16">
                    <Button onClick={() => navigate('/')}>Return to HomePage</Button>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Results
