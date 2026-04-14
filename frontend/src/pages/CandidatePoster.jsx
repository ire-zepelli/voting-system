import React, { useState } from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import PosterCard from '../components/Candidate-Poster/PosterCard'

import NxtBtn from "../components/Candidate-Poster/NxtBtn";
import PrevBtn from "../components/Candidate-Poster/PrevBtn";
import { BEATScandidates } from '../components/Candidate-Poster/CandidateInfo'
import { PEAKcandidates } from '../components/Candidate-Poster/CandidateInfo'

export default function CandidatePoster() {
  const [selectedParty, setSelectedParty] = useState("BEATS");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeCandidates = selectedParty === "BEATS" ? BEATScandidates : PEAKcandidates;

  const totalSlides = activeCandidates.length;

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const toggleParty = (party) => {
    if (party === selectedParty) return;


    setIsTransitioning(true);


    setTimeout(() => {
      setSelectedParty(party);
      setCurrentSlide(0);
      setIsTransitioning(false);
    }, 300);
  }

  return (
    <div className='bg-[#34102A] min-h-screen max-h-screen flex flex-col justify-between'>
      <Header />

      <div className="flex justify-center gap-4 -pt-5 pb-5 mt-4 relative z-10 w-full px-5">
        <button
          onClick={() => toggleParty("BEATS")}
          className={`px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 shadow-md ${selectedParty === "BEATS" ? "bg-gradient-to-r from-[#ff9500] to-[#b37c00] text-black scale-105 shadow-[0_0_15px_rgba(255,149,0,0.6)]" : "bg-[#451c3a] text-white hover:bg-[#582449]"}`}
        >
          BEATS Party
        </button>
        <button
          onClick={() => toggleParty("PEAK")}
          className={`px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 shadow-md ${selectedParty === "PEAK" ? "bg-gradient-to-r from-[#ff9500] to-[#b37c00] text-black scale-105 shadow-[0_0_15px_rgba(255,149,0,0.6)]" : "bg-[#451c3a] text-white hover:bg-[#582449]"}`}
        >
          PEAK Party
        </button>
      </div>

      <div className={`w-full overflow-hidden transition-all duration-300 transform ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        <div
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {activeCandidates.map((candidate, idx) => (
            <div key={idx} className="w-full flex-shrink-0">
              <PosterCard
                title={candidate.title}
                name={candidate.name}
                description={candidate.description}
                pdfLink={candidate.pdfLink}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between ml-30 p-5 w-11/12 min-h-[80px] items-center">
        {currentSlide > 0 ? <PrevBtn onClick={handlePrev} /> : <span />}
        {currentSlide < totalSlides - 1 && <NxtBtn onClick={handleNext} />}
      </div>
      <Footer />

    </div>
  );
}
