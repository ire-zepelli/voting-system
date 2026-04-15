import React from "react";
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
        <div className='bg-[#3B0B2E]/98 min-h-screen'>
            <Header />
            <main className="flex-grow w-full max-w-[1440px] px-4 sm:px-8 md:px-16 py-6 fade-in-up box-border mx-auto">
                <div className="flex gap-1 mb-1 items-center justify-start ml-1">
                    <img src={uclmccs} alt="UCLM CCS Logo" className="w-[45px] h-auto object-contain" />
                    <img src={uclmpsits} alt="UCLM PSITS Logo" className="w-[45px] h-auto object-contain" />
                </div>
                <h1 className="text-[36px] sm:text-[46px] text-white font-bold tracking-tight mb-12">Results:</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-white">
                        <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-2">Registered Voters</p>
                        <p className="text-4xl font-bold tracking-tight">{data.summary.registeredVoters}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-white">
                        <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-2">Ballots Cast</p>
                        <p className="text-4xl font-bold tracking-tight">{data.summary.ballotsCast}</p>
                    </div>
                </div>

                <div className="flex flex-col w-full text-white">
                    {data.positions.map((position, index) => (
                        <div key={index} className="mb-10 w-full">
                            <h2 className="text-[24px] sm:text-[28px] font-normal tracking-wide mb-4 whitespace-normal">{position.position}</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 w-full">
                                {position.candidates.map((candidate, candidateIndex) => (
                                    <div key={candidateIndex} className="w-full bg-transparent">
                                        <ResultsCard
                                            text={`${candidate.name} - ${candidate.partylist}`}
                                            voteNum={candidate.voteCount}
                                            percentage={formatPercentage(candidate.percentage)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {data.summary.ballotsCast === 0 && (
                    <p className="text-white/65 text-sm mb-8">No ballots have been submitted yet. The result cards will update once voting starts.</p>
                )}
                <div className='flex items-center justify-center w-100 mx-auto my-18'>
                    <Button onClick={() => navigate('/')}>Return to HomePage</Button>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Results
