<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ResultsCard from "../components/ResultsCard";
import Footer from "../components/Footer";
import uclmccs from "../assets/uclmccs.png";
import uclmpsits from "../assets/uclmpsits.png";
import Button from "../components/Button";
import { formatPercentage } from "../data/election";
import { apiRequest } from "../lib/api";
=======
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ResultsCard from '../components/ResultsCard'
import Footer from '../components/Footer'
import uclmccs from '../assets/uclmccs.png'
import uclmpsits from '../assets/uclmpsits.png'
import Button from '../components/Button'
>>>>>>> d677bb15c4f592c6beaec4b108ed71e7d864c94c

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
<<<<<<< HEAD

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
    const navigate = useNavigate();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["results"],
        queryFn: () => apiRequest("/api/results"),
    });

    if (isLoading) {
        return (
            <div className="bg-[#3B0B2E]/98 min-h-screen text-white flex items-center justify-center px-6 text-center">
                <div>
                    <p className="text-3xl font-bold tracking-tight">Loading results...</p>
                    <p className="text-white/70 mt-3">Please wait while the current standings are fetched.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#3B0B2E]/98 min-h-screen text-white flex items-center justify-center px-6 text-center">
                <div className="max-w-xl">
                    <p className="text-3xl font-bold tracking-tight">Unable to load results</p>
                    <p className="text-white/70 mt-3 mb-8">{error.message}</p>
                    <div className="max-w-xs mx-auto">
                        <Button onClick={() => refetch()}>Try Again</Button>
                    </div>
                </div>
            </div>
        );
    }

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
                    <h1 className="text-4xl md:text-5xl lg:text-7xl text-white font-extrabold tracking-tight mb-4 drop-shadow-lg">
                        Election Results
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mt-2 font-medium">
                        Live results for the PSITS 2026 Student Council Elections. Thank you for making your voice heard.
                    </p>
                </div>

                {/* Summary Cards */}
                <FadeInOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 sm:mb-20 max-w-3xl mx-auto">
                        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-white flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-md">
                            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/50 mb-2 font-bold">Registered Voters</p>
                            <p className="text-4xl sm:text-6xl font-black tracking-tight drop-shadow-md text-white/90">{data.summary.registeredVoters}</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-white flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-md">
                            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/50 mb-2 font-bold">Ballots Cast</p>
                            <p className="text-4xl sm:text-6xl font-black tracking-tight drop-shadow-md text-[#FFD700]">{data.summary.ballotsCast}</p>
                        </div>
                    </div>
                </FadeInOnScroll>

                <div className="flex flex-col w-full mx-auto max-w-5xl text-white">
                    {data.positions.map((position, index) => (
=======

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
>>>>>>> d677bb15c4f592c6beaec4b108ed71e7d864c94c
                        <FadeInOnScroll key={index}>
                            <div className="mb-16 sm:mb-20 w-full relative">
                                {/* Position Title with styling */}
                                <div className="flex items-center gap-4 mb-8 sm:mb-10">
                                    <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-white/20"></div>
<<<<<<< HEAD
                                    <h2 className="text-[20px] sm:text-[26px] md:text-[30px] font-bold tracking-widest uppercase text-[#FFD700] whitespace-nowrap px-4">
                                        {position.position}
=======
                                    <h2 className="text-[20px] sm:text-[26px] md:text-[30px] font-bold tracking-widest uppercase text-[#FFD700] whitespace-nowrap px-4 ">
                                        {position.title}
>>>>>>> d677bb15c4f592c6beaec4b108ed71e7d864c94c
                                    </h2>
                                    <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-white/20"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full px-2">
                                    {position.candidates.map((candidate, candidateIndex) => (
                                        <ResultsCard
                                            key={candidateIndex}
<<<<<<< HEAD
                                            text={`${candidate.name} - ${candidate.partylist}`}
                                            voteNum={candidate.voteCount}
                                            percentage={formatPercentage(candidate.percentage)}
=======
                                            text={candidate.text}
                                            voteNum={candidate.voteNum}
                                            percentage={candidate.percentage}
>>>>>>> d677bb15c4f592c6beaec4b108ed71e7d864c94c
                                        />
                                    ))}
                                </div>
                            </div>
                        </FadeInOnScroll>
                    ))}
                </div>
<<<<<<< HEAD
                {data.summary.ballotsCast === 0 && (
                    <FadeInOnScroll>
                        <div className="flex flex-col items-center justify-center mb-12">
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-center max-w-lg shadow-lg">
                                <p className="text-white/65 text-sm font-medium">No ballots have been submitted yet. The result cards will update once voting starts.</p>
                            </div>
                        </div>
                    </FadeInOnScroll>
                )}
=======

>>>>>>> d677bb15c4f592c6beaec4b108ed71e7d864c94c
                <div className="flex items-center justify-center w-full mt-10 mb-16">
                    <Button onClick={() => navigate('/')}>Return to HomePage</Button>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Results;
