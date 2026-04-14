import React, { useState } from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import PosterCard from '../components/Candidate-Poster/PosterCard'
import Apawan from '../assets/APAWAN_INDIV_CREDENTIALS.png'
import NxtBtn from "../components/Candidate-Poster/NxtBtn";
import PrevBtn from "../components/Candidate-Poster/PrevBtn";
import Resurreccion from '../assets/RESURRECCION.pdf'

export default function CandidatePoster() {
  const positions = [
    {
      name: "ELTONG MIGUEL CUMAHIG",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
      pdfLink: Apawan
    },
    {
      name: "LEXTON FRUED DE LEON",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
      pdfLink: Resurreccion
    },
    {
      name: "KENT BOY AVENIDO",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
      pdfLink: Apawan
    },
    {
      name: "MITCHEL MYKEL BENTOY",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
      pdfLink: Apawan
    },
  ]
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = positions.length;

  const currentCandidate = positions[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className='bg-[#34102A] min-h-screen max-h-screen flex flex-col justify-between'>
      <Header />
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {positions.map((candidate, idx) => (
            <div key={idx} className="w-full flex-shrink-0">
              <PosterCard
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
