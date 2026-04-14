import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import CandidatesBanner from "../components/Voting/CandidatesBanner";
import test_candidate_picture from "../assets/test_candidate_picture.png";
import uclmccs from "../assets/uclmccs.png";
import uclmpsits from "../assets/uclmpsits.png";
import Footer from "../components/Footer";
import Button from "../components/Button";

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
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[60px]"
      }`}
    >
      {children}
    </div>
  );
};

export default function Voting() {
  const [selectedVotes, setSelectedVotes] = useState({});
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  const handleVote = (groupId, candidateId) => {
    setSelectedVotes((prev) => ({
      ...prev,
      [groupId]: prev[groupId] === candidateId ? null : candidateId,
    }));
  };

  const candidates = [
    {
      id: 1,
      position: "President",
      title: "PRESIDENT",
      candidates: [
        {
          id: 1,
          name: "Crista Monica Oscar",
          image: "/BEATS/TRANSPARENT_INDIV/OSCAR_PRES.png",
        },
        {
          id: 2,
          name: "Darren Villanueva",
          image: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/PRES- VILLANUEVA_.png",
        },
      ],
    },
    {
      id: 2,
      position: "Vice President Internal",
      title: "VP-INTERNAL",
      candidates: [
        {
          id: 1,
          name: "Dan Pierre Pogoy",
          image: "/BEATS/TRANSPARENT_INDIV/POGOY_VP_INTERNAL.png",
        },
        {
          id: 2,
          name: "Altheia Daño",
          image: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP INTERNAL- DANO.png",
        },
      ],
    },
    {
      id: 3,
      position: "Vice President External",
      title: "VP-EXTERNAL",
      candidates: [
        {
          id: 1,
          name: "Ryan Pacumio",
          image: "/BEATS/TRANSPARENT_INDIV/PACUMIO_VP_EXTERNAL.png",
        },
        {
          id: 2,
          name: "Kane Huxley Book",
          image: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP EXTERNAL - BOOK.png",
        },
      ],
    },
    {
      id: 4,
      position: "Secretary",
      title: "SECRETARY",
      candidates: [
        {
          id: 1,
          name: "May Lapeña",
          image: "/BEATS/TRANSPARENT_INDIV/LAPENA_SECRETARY.png",
        },
        {
          id: 2,
          name: "Diane Mendoza",
          image: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/SECRETARY - MENDOZA_.png",
        },
      ],
    },
    {
      id: 5,
      position: "Treasurer",
      title: "TREASURER",
      candidates: [
        {
          id: 1,
          name: "Keith Ramises Latonio",
          image: "/BEATS/TRANSPARENT_INDIV/LATONIO_TREASURER.png",
        },
        {
          id: 2,
          name: "Hanny Jane Enriquez",
          image:
            "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/TREASURER - ENRIQUEZ_.png",
        },
      ],
    },
    {
      id: 6,
      position: "Auditor",
      title: "AUDITOR",
      candidates: [
        {
          id: 1,
          name: "Emmanuel Franz Apawan",
          image: "/BEATS/TRANSPARENT_INDIV/APAWAN_AUDITOR.png",
        },
        {
          id: 2,
          name: "Myka Angela Dumael",
          image: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/AUDIT- DUMAEL.png",
        },
      ],
    },
    {
      id: 7,
      position: "PIO",
      title: "PIO",
      candidates: [
        {
          id: 1,
          name: "Fiona Monilar",
          image: "/BEATS/TRANSPARENT_INDIV/MONILAR_PIO.png",
        },
        {
          id: 2,
          name: "Jea Mary Trixy Magallano",
          image:
            "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/P.I OFFICER- MAGALLANO.png",
        },
      ],
    },
    {
      id: 8,
      position: "Chief of Creatives",
      title: "CHIEF OF\nCREATIVES",
      candidates: [
        {
          id: 1,
          name: "Harry Conde",
          image: "/BEATS/TRANSPARENT_INDIV/CONDE_CHIEF_OF_CREATIVES.png",
        },
        {
          id: 2,
          name: "Tristhan Villamor",
          image:
            "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CREATIVES - VILLAMOR_.png",
        },
      ],
    },
    {
      id: 9,
      position: "Chief of Representatives",
      title: "CHIEF OF\nREPRESENTATIVES",
      candidates: [
        {
          id: 1,
          name: "Jhoviegen Cuysona",
          image: "/BEATS/TRANSPARENT_INDIV/CUYSONA_CHIEF_OF_REP.png",
        },
        {
          id: 2,
          name: "Abijah Shen Regado",
          image:
            "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/REPRESENTATIVE - REGADO.png",
        },
      ],
    },
    {
      id: 10,
      position: "Chief of Students Develeopment",
      title: "CHIEF OF\nSTUDENTS DEVELOPMENT",
      candidates: [
        {
          id: 1,
          name: "Aimee Gayle Cogal",
          image: "/BEATS/TRANSPARENT_INDIV/COGAL_CHIEF_OF_STUDENTDEV.png",
        },
        {
          id: 2,
          name: "Jeoff Andrew Demecillo",
          image:
            "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/DEVELOPMENT - DEMECILLO.png",
        },
      ],
    },
    {
      id: 11,
      position: "Academic Representative",
      title: "ACADEMIC\nREPRESENTATIVE",
      candidates: [
        {
          id: 1,
          name: "Rose Anne Resurreccion",
          image: "/BEATS/TRANSPARENT_INDIV/RESURRECCION_ACADEMIC_REP.png",
        },
      ],
    },
    {
      id: 12,
      position: "CARES Representative",
      title: "CARES\nREPRESENTATIVE",
      candidates: [
        {
          id: 1,
          name: "Mary Grace Patalinghug",
          image: "/BEATS/TRANSPARENT_INDIV/PATALINGHUG_CARE_REP.png",
        },
        {
          id: 2,
          name: "Nathaniel Ornopia",
          image: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CARES REP- ORNOPIA.png",
        },
      ],
    },
  ];

  const handleNext = () => {
    if (currentPositionIndex < candidates.length - 1) {
      setCurrentPositionIndex(currentPositionIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentPositionIndex > 0) {
      setCurrentPositionIndex(currentPositionIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex gap-1 items-center justify-start ml-18">
        <img
          src={uclmccs}
          alt="UCLM CCS Logo"
          className="w-[45px] h-auto object-contain"
        />
        <img
          src={uclmpsits}
          alt="UCLM PSITS Logo"
          className="w-[45px] h-auto object-contain"
        />
      </div>
      <div className="flex flex-col min-h-[50vh]">
        <FadeInOnScroll key={candidates[currentPositionIndex].id}>
          <CandidatesBanner
            title={candidates[currentPositionIndex].title}
            position={candidates[currentPositionIndex].position}
            candidates={candidates[currentPositionIndex].candidates}
            selectedCandidateId={
              selectedVotes[candidates[currentPositionIndex].id]
            }
            onSelectCandidate={(candidateId) =>
              handleVote(candidates[currentPositionIndex].id, candidateId)
            }
          />
        </FadeInOnScroll>
      </div>

      <div className="flex flex-row justify-center gap-6 md:gap-12 w-full px-4 mb-2">
        {currentPositionIndex > 0 && (
          <div className="w-48 md:w-[250px]">
            <Button className="w-full" onClick={handleBack}>
              Back
            </Button>
          </div>
        )}
        <div className="w-48 md:w-[250px]">
          {currentPositionIndex < candidates.length - 1 ? (
            <Button className="w-full" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button className="w-full">Submit</Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
