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
        { id: 1, name: "Juan dela Cruz", image: test_candidate_picture },
        { id: 2, name: "Maria Santos", image: test_candidate_picture },
      ],
    },
    {
      id: 2,
      position: "Vice President Internal",
      title: "VP-INTERNAL",
      candidates: [
        { id: 1, name: "Jose Reyes", image: test_candidate_picture },
        { id: 2, name: "Ana Lim", image: test_candidate_picture },
      ],
    },
    {
      id: 3,
      position: "Vice President External",
      title: "VP-EXTERNAL",
      candidates: [
        { id: 1, name: "Carlo Mendoza", image: test_candidate_picture },
        { id: 2, name: "Sofia Garcia", image: test_candidate_picture },
      ],
    },
    {
      id: 4,
      position: "Secretary",
      title: "SECRETARY",
      candidates: [
        { id: 1, name: "Luis Torres", image: test_candidate_picture },
        { id: 2, name: "Nina Flores", image: test_candidate_picture },
      ],
    },
    {
      id: 5,
      position: "Treasurer",
      title: "TREASURER",
      candidates: [
        { id: 1, name: "Marco Villanueva", image: test_candidate_picture },
        { id: 2, name: "Clara Ramos", image: test_candidate_picture },
      ],
    },
    {
      id: 6,
      position: "Auditor",
      title: "AUDITOR",
      candidates: [
        { id: 1, name: "Diego Castro", image: test_candidate_picture },
        { id: 2, name: "Isabel Cruz", image: test_candidate_picture },
      ],
    },
    {
      id: 7,
      position: "PIO",
      title: "PIO",
      candidates: [
        { id: 1, name: "Andres Navarro", image: test_candidate_picture },
        { id: 2, name: "Camille Bautista", image: test_candidate_picture },
      ],
    },
    {
      id: 8,
      position: "Chief of Developer",
      title: "CHIEF OF\nDEVELOPER",
      candidates: [
        { id: 1, name: "Ryan Aquino", image: test_candidate_picture },
        { id: 2, name: "Trisha Domingo", image: test_candidate_picture },
      ],
    },
    {
      id: 9,
      position: "Chief of Creatives",
      title: "CHIEF OF\nCREATIVES",
      candidates: [
        { id: 1, name: "Kevin Ong", image: test_candidate_picture },
        { id: 2, name: "Lovely Tan", image: test_candidate_picture },
      ],
    },
    {
      id: 10,
      position: "Chief of Representatives",
      title: "CHIEF OF\nREPRESENTATIVES",
      candidates: [
        { id: 1, name: "Bryan Go", image: test_candidate_picture },
        { id: 2, name: "Patricia Yu", image: test_candidate_picture },
      ],
    },
    {
      id: 11,
      position: "Chief of Students Develeopment",
      title: "CHIEF OF\nSTUDENTS DEVELOPMENT",
      candidates: [
        { id: 1, name: "Harold Sy", image: test_candidate_picture },
        { id: 2, name: "Maricel Co", image: test_candidate_picture },
      ],
    },
    {
      id: 12,
      position: "Academic Representative",
      title: "ACADEMIC\nREPRESENTATIVE",
      candidates: [
        { id: 1, name: "Francis Tiu", image: test_candidate_picture },
        { id: 2, name: "Vanessa Kho", image: test_candidate_picture },
      ],
    },
    {
      id: 13,
      position: "CARES Representative",
      title: "CARES\nREPRESENTATIVE",
      candidates: [
        { id: 1, name: "Jerome Ng", image: test_candidate_picture },
        { id: 2, name: "Sheila Dee", image: test_candidate_picture },
      ],
    },
  ];
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex gap-1 mb-1 items-center justify-start ml-18 py-2">
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
      <div className="flex flex-col bg-transparent ">
        {candidates.map((group) => (
          <FadeInOnScroll key={group.id}>
            <CandidatesBanner
              title={group.title}
              position={group.position}
              candidates={group.candidates}
              selectedCandidateId={selectedVotes[group.id]}
              onSelectCandidate={(candidateId) =>
                handleVote(group.id, candidateId)
              }
            />
          </FadeInOnScroll>
        ))}
      </div>
      <FadeInOnScroll>
        <div className="flex flex-row justify-center gap-6 md:gap-12 mt-12 mb-24 w-full px-4">
          <div className="w-48 md:w-[250px]">
            <Button className="">
              Back
            </Button>
          </div>
          <div className="w-48 md:w-[250px]">
            <Button className="">
              Submit
            </Button>
          </div>
        </div>
      </FadeInOnScroll>
      <Footer />
    </div>
  );
}
