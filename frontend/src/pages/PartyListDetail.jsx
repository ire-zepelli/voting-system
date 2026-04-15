import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MemberCardRow from "../components/partylist/MemberCardRow";
import Footer from "../components/Footer";
import PosterCard from "../components/Candidate-Poster/PosterCard";
import { BEATScandidates, PEAKcandidates } from "../components/Candidate-Poster/CandidateInfo";

const PARTY_DATA = {
  beats: [
    {
      title: "EXECUTIVES",
      members: [
        { name: "May Lapeña", position: "Secretary", photo: "/BEATS/TRANSPARENT_INDIV/LAPENA_SECRETARY.png", poster: "/BEATS/INDIV_POSTERS/LAPENA_INDIV.png" },
        { name: "Dan Pierre Pogoy", position: "Vice-President Internal", photo: "/BEATS/TRANSPARENT_INDIV/POGOY_VP_INTERNAL.png", poster: "/BEATS/INDIV_POSTERS/POGOY_INDIV.png" },
        { name: "Crista Monica Oscar", position: "President", photo: "/BEATS/TRANSPARENT_INDIV/OSCAR_PRES.png", poster: "/BEATS/INDIV_POSTERS/OSCAR_INDIV.png" },
        { name: "Ryan Pacumio", position: "Vice-President External", photo: "/BEATS/TRANSPARENT_INDIV/PACUMIO_VP_EXTERNAL.png", poster: "/BEATS/INDIV_POSTERS/PACUMIO_INDIV.png" },
        { name: "Keith Ramises Latonio", position: "Treasurer", photo: "/BEATS/TRANSPARENT_INDIV/LATONIO_TREASURER.png", poster: "/BEATS/INDIV_POSTERS/LATONIO_INDIV.png" },
      ],
    },
    {
      title: "CHIEFS",
      members: [
        { name: "Fiona Monilar", position: "Public Information Officer", photo: "/BEATS/TRANSPARENT_INDIV/MONILAR_PIO.png", poster: "/BEATS/INDIV_POSTERS/MONILAR_INDIV.png" },
        { name: "Jhoviegen Cuysona", position: "Chief of Representative", photo: "/BEATS/TRANSPARENT_INDIV/CUYSONA_CHIEF_OF_REP.png", poster: "/BEATS/INDIV_POSTERS/CUYSONA_INDIV.png" },
        { name: "Harry Conde", position: "Chief of Creatives", photo: "/BEATS/TRANSPARENT_INDIV/CONDE_CHIEF_OF_CREATIVES.png", poster: "/BEATS/INDIV_POSTERS/CONDE_INDIV.png" },
        { name: "Emmanuel Franz Apawan", position: "Auditor", photo: "/BEATS/TRANSPARENT_INDIV/APAWAN_AUDITOR.png", poster: "/BEATS/INDIV_POSTERS/APAWAN_INDIV.png" },
        { name: "Aimee Gayle Cogal", position: "Chief of Students Development", photo: "/BEATS/TRANSPARENT_INDIV/COGAL_CHIEF_OF_STUDENTDEV.png", poster: "/BEATS/INDIV_POSTERS/COGAL_INDIV.png" },
      ],
    },
    {
      title: "REPRESENTATIVES",
      members: [
        { name: "Rose Anne Resurreccion", position: "Academic Representative", photo: "/BEATS/TRANSPARENT_INDIV/RESURRECCION_ACADEMIC_REP.png", poster: "/BEATS/INDIV_POSTERS/RESURRECCION_INDIV.png" },
        { name: "Mary Grace Patalinghug", position: "CARES Representative", photo: "/BEATS/TRANSPARENT_INDIV/PATALINGHUG_CARE_REP.png", poster: "/BEATS/INDIV_POSTERS/PATALINGHUG_INDIV.png" },
      ],
    },
  ],
  peak: [
    {
      title: "EXECUTIVES",
      members: [
        { name: "Diane Mendoza", position: "Secretary", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/SECRETARY - MENDOZA_.png", poster: "/PEAK/INDIV_POSTERS/SECRETARY - MENDOZA .jpg" },
        { name: "Altheia Daño", position: "Vice-President Internal", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP INTERNAL- DANO.png", poster: "/PEAK/INDIV_POSTERS/VP  INTERNAL - DANO.jpg" },
        { name: "Darren Villanueva", position: "President", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/PRES- VILLANUEVA_.png", poster: "/PEAK/INDIV_POSTERS/PRESIDENT - VILLANUEVA .jpg" },
        { name: "Kane Huxley Book", position: "Vice-President External", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP EXTERNAL - BOOK.png", poster: "/PEAK/INDIV_POSTERS/VP EXTERNAL - BOOK.jpg" },
        { name: "Hanny Jane Enriquez", position: "Treasurer", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/TREASURER - ENRIQUEZ_.png", poster: "/PEAK/INDIV_POSTERS/TREASURER - ENRIQUEZ .jpg" },
      ],
    },
    {
      title: "CHIEFS",
      members: [
        { name: "Jea Mary Trixy Magallano", position: "Public Information Officer", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/P.I OFFICER- MAGALLANO.png", poster: "/PEAK/INDIV_POSTERS/PI OFFICER- MAGALLANO .jpg" },
        { name: "Abijah Shen Regado", position: "Chief of Representative", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/REPRESENTATIVE - REGADO.png", poster: "/PEAK/INDIV_POSTERS/CHIEF OF REPRESENTATIVE - REGADO.jpg" },
        { name: "Tristhan Mark Vincent Villamor", position: "Chief of Creatives", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CREATIVES - VILLAMOR_.png", poster: "/PEAK/INDIV_POSTERS/CHIEF OF CREATIVES  -VILLAMOR.jpg" },
        { name: "Myka Angela Dumael", position: "Auditor", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/AUDIT- DUMAEL.png", poster: "/PEAK/INDIV_POSTERS/AUDITOR - DUMAEL.jpg" },
        { name: "Jeoff Andrew Demecillo", position: "Chief of Students Development", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/DEVELOPMENT - DEMECILLO.png", poster: "/PEAK/INDIV_POSTERS/DEVELOPMENT - DEMECILLO .jpg" },
      ],
    },
    {
      title: "REPRESENTATIVES",
      members: [
        { name: "Nathaniel Ornopia", position: "CARES Representative", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CARES REP- ORNOPIA.png", poster: "/PEAK/INDIV_POSTERS/CARES REP - ORNOPIA .jpg" },
      ],
    },
  ],
};

// ─── One full-viewport section ────────────────────────────────────────────────
function Section({ section, isLast, onMemberClick }) {
  return (
    <>
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          // subtle divider between sections (not on last)
          borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Ghost title — large, very faded, centred in upper half */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            fontSize: "clamp(7rem, 20vw, 30rem)",
            fontWeight: "bold",
            fontFamily: "Inter, sans-serif",
            color: "rgba(255,255,255,0.05)",
            lineHeight: 1,
            letterSpacing: "-0.08em",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {section.title}
        </span>

        {/* Foreground title */}
        <div
          style={{
            position: "absolute",
            top: "30%", // Moved up so only heads overlap, not the whole body
            left: 0,
            right: 0,
            padding: "0 5vw",
            zIndex: 1,
            pointerEvents: "none",
            textAlign: "center", // Align Center exactly like the picture
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: section.title === "REPRESENTATIVES"
                ? "clamp(2rem, 8vw, 7rem)"
                : "clamp(3.5rem, 11vw, 9.5rem)",
              fontWeight: "bold",
              fontFamily: "Inter, sans-serif",
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-0.08em", // Tighter letter spacing
            }}
          >
            {section.title}
          </span>
        </div>

        {/* Cards row — sits in the bottom 60% of the section */}
        {/* Extra paddingTop gives photo overflow room above cards */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "96%",
            margin: "0 auto",
            paddingTop: "6vh",
            paddingBottom: "4vh",
          }}
        >
          <MemberCardRow
            members={section.members}
            rowHeight="clamp(380px, 70vh, 750px)"
            showName={true}
            onSelect={(i) => onMemberClick ? onMemberClick(section.members[i]) : undefined}
          />
        </div>
      </section>
    </>
  );
}

// ─── Sticky Header ──────────────────────────────────────────────────────────────
function StickyHeader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "2rem",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <Link
        to="/partylist"
        className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 group whitespace-nowrap font-poppins text-[17px] tracking-tight no-underline"
        style={{ pointerEvents: "auto" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 opacity-80 group-hover:opacity-100 group-hover:-translate-x-1 transition-transform duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        Return To Partylist
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PartyListDetail() {
  const { id } = useParams();
  const partyId = id ? id.toLowerCase() : "beats";
  const sections = PARTY_DATA[partyId] || PARTY_DATA.beats;
  const [popupData, setPopupData] = useState(null);

  const handleMemberClick = (member) => {
    const candidates = partyId === "beats" ? BEATScandidates : PEAKcandidates;

    // Safely match by exact position/title between PARTY_DATA and CandidateInfo.js
    const info = candidates.find(c => 
        c.title && member.position && 
        c.title.trim().toLowerCase() === member.position.trim().toLowerCase()
    );

    if (info) {
      setPopupData({ ...info, photo: member.photo, poster: member.poster });
    }
  };

  return (
    <div
      style={{
        background: "#34102A",
        minHeight: "100vh",
        fontFamily: "'Arial', sans-serif",
        overflowX: "hidden",
        overflowY: "auto",
        position: "relative",
      }}
    >
      {/* Navbar — lives outside the zoom wrapper so it stays normal size */}
      <StickyHeader />

      {sections.map((section, i) => (
        <Section
          key={section.title}
          section={section}
          isLast={i === sections.length - 1}
          onMemberClick={handleMemberClick}
        />
      ))}

      <Footer />

      {/* Popup Overlay */}
      {popupData && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setPopupData(null)}
          style={{
            background: 'rgba(20, 4, 15, 0.85)',
            backdropFilter: 'blur(12px)',
            animation: 'popupFadeIn 0.3s ease-out forwards'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[85rem] h-[85vh] sm:h-[80vh] flex flex-col"
            style={{ animation: 'popupRise 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            {/* Elegant Close Button */}
            <button
              onClick={() => setPopupData(null)}
              className="absolute -top-5 -right-5 z-50 text-white bg-[#3B0B2E] border-[3px] border-[#ff9500]/70 hover:border-[#ff9500] hover:bg-[#582449] hover:scale-110 hover:rotate-90 rounded-full w-[3.25rem] h-[3.25rem] flex items-center justify-center text-2xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,149,0,0.4)]"
              title="Close"
            >
              ✕
            </button>

            {/* Styling Wrapper for PosterCard */}
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden p-[2px] bg-gradient-to-br from-[#ff9500]/40 via-[#d13a8b]/30 to-[#3B0B2E]/50 shadow-[0_30px_70px_rgba(0,0,0,0.7)] flex">
              <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-[#2c0620] flex">
                <PosterCard
                  className="w-full h-full m-0 !rounded-none !shadow-none !bg-transparent overflow-y-auto overflow-x-hidden"
                  name={popupData.name}
                  description={popupData.description}
                  pdfLink={popupData.pdfLink}
                  image={popupData.poster || popupData.photo}
                />
              </div>
            </div>
          </div>

          <style>{`
            @keyframes popupFadeIn {
               from { opacity: 0; }
               to { opacity: 1; }
            }
            @keyframes popupRise {
               from { opacity: 0; transform: scale(0.92) translateY(30px); }
               to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
