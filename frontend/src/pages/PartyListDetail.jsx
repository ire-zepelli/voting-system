import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MemberCardRow from "../components/partylist/MemberCardRow";
import Footer from "../components/Footer";
import PosterCard from "../components/Candidate-Poster/PosterCard";
import { BEATScandidates, PEAKcandidates } from "../components/Candidate-Poster/CandidateInfo";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PARTY_LABELS = {
  beats: {
    label: "B.E.A.T.S.",
    link: "https://drive.google.com/file/d/1BGsqlm_8QKjti646_ueBjrsEmSYHGc-1/view?usp=sharing",
    orgChart: "/BEATS/OrgChart/BEATS_ORG_CHART.png",
    platformImages: [
      "/BEATS/PLATFORM/BEATS_VISIONMISSION.png",
      "/BEATS/PLATFORM/BEATS_FIRST.png",
      "/BEATS/PLATFORM/BEATS_SECOND.png",
    ],
  },
  peak: {
    label: "P.E.A.K.",
    link: "https://drive.google.com/file/d/1rKZIoX_GiLig85eTximHCNLrp25SvTxL/view?usp=sharing",
    orgChart: "/PEAK/OrgChart/PEAK_ORG_CHART.jpg",
    platformImages: [
      "/PEAK/PLATFORM/PEAK_VISION.jpg",
      "/PEAK/PLATFORM/PEAK_MISSION.jpg",
      "/PEAK/PLATFORM/PLATFORM_FIRST.jpg",
      "/PEAK/PLATFORM/PLATFORM_SECOND.jpg",
      "/PEAK/PLATFORM/PLATFORM_THIRD.jpg",
      "/PEAK/PLATFORM/PLATFORM_FOURTH.jpg",
      "/PEAK/PLATFORM/PEAK_POSTER.jpg",
    ],
  },
};

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
        { name: "Mary Grace Patalinghug", position: "CARES Representative", photo: "/BEATS/TRANSPARENT_INDIV/PATALINGHUG_CARE_REP.png", flip: true, poster: "/BEATS/INDIV_POSTERS/PATALINGHUG_INDIV.png" },
      ],
    },
  ],
  peak: [
    {
      title: "EXECUTIVES",
      members: [
        { name: "Diane Mendoza", position: "Secretary", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/SECRETARY - MENDOZA_.png", flip: true, poster: "/PEAK/INDIV_POSTERS/SECRETARY - MENDOZA .jpg" },
        { name: "Altheia Daño", position: "Vice-President Internal", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP INTERNAL- DANO.png", flip: true, poster: "/PEAK/INDIV_POSTERS/VP  INTERNAL - DANO.jpg" },
        { name: "Darren Villanueva", position: "President", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/PRES- VILLANUEVA_.png", poster: "/PEAK/INDIV_POSTERS/PRESIDENT - VILLANUEVA .jpg" },
        { name: "Kane Huxley Book", position: "Vice-President External", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP EXTERNAL - BOOK.png", flip: false, poster: "/PEAK/INDIV_POSTERS/VP EXTERNAL - BOOK.jpg" },
        { name: "Hanny Jane Enriquez", position: "Treasurer", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/TREASURER - ENRIQUEZ_.png", flip: false, poster: "/PEAK/INDIV_POSTERS/TREASURER - ENRIQUEZ .jpg" },
      ],
    },
    {
      title: "CHIEFS",
      members: [
        { name: "Jea Mary Trixy Magallano", position: "Public Information Officer", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/P.I OFFICER- MAGALLANO.png", flip: true, poster: "/PEAK/INDIV_POSTERS/PI OFFICER- MAGALLANO .jpg" },
        { name: "Abijah Shen Regado", position: "Chief of Representative", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/REPRESENTATIVE - REGADO.png", flip: true, poster: "/PEAK/INDIV_POSTERS/CHIEF OF REPRESENTATIVE - REGADO.jpg" },
        { name: "Tristhan Mark Vincent Villamor", position: "Chief of Creatives", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CREATIVES - VILLAMOR_.png", poster: "/PEAK/INDIV_POSTERS/CHIEF OF CREATIVES  -VILLAMOR.jpg" },
        { name: "Myka Angela Dumael", position: "Auditor", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/AUDIT- DUMAEL.png", flip: false, poster: "/PEAK/INDIV_POSTERS/AUDITOR - DUMAEL.jpg" },
        { name: "Jeoff Andrew Demecillo", position: "Chief of Students Development", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/DEVELOPMENT - DEMECILLO.png", flip: false, poster: "/PEAK/INDIV_POSTERS/DEVELOPMENT - DEMECILLO .jpg" },
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
function Section({ section, isLast, initialFacing, onMemberClick }) {
  return (
    <section
      id={section.title}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Ghost title */}
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
          top: "30%",
          left: 0,
          right: 0,
          padding: "0 5vw",
          zIndex: 1,
          pointerEvents: "none",
          textAlign: "center",
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
            letterSpacing: "-0.08em",
          }}
        >
          {section.title}
        </span>
      </div>

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
          initialFacing={initialFacing}
        />
      </div>
    </section>
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Link
        to="/partylist"
        className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 group whitespace-nowrap font-poppins text-[17px] tracking-tight no-underline"
        style={{ pointerEvents: "auto" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Return To Partylist
      </Link>
    </div>
  );
}

function RoleNavbar({ sections, onSectionClick }) {
  const scrollTo = (id) => {
    if (onSectionClick) onSectionClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "6rem",
        right: "2rem",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "flex-end",
      }}
    >
      {sections.map((sec) => (
        <button
          key={sec.title}
          onClick={() => scrollTo(sec.title)}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.85rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            cursor: "pointer",
            padding: "0.25rem 0",
            transition: "all 0.3s ease",
            fontFamily: "Inter, sans-serif",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#fff";
            e.target.style.transform = "translateX(-8px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "rgba(255,255,255,0.6)";
            e.target.style.transform = "translateX(0)";
          }}
        >
          {sec.title}
        </button>
      ))}
    </div>
  );
}

function ActionButton({ text, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.2)",
        padding: "0.8rem 1.6rem",
        borderRadius: "999px",
        color: "#fff",
        fontSize: "0.85rem",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
        fontFamily: "Inter, sans-serif",
        backdropFilter: "blur(4px)",
      }}
    >
      {text}
    </button>
  );
}

function ImageModal({ src, alt, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        cursor: "zoom-out",
        animation: "modalFade 0.3s ease-out",
      }}
    >
      <style>{`
        @keyframes modalFade {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(12px); }
        }
        @keyframes imgZoom {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          color: "#fff",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          zIndex: 1001,
        }}
        onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.2)"; }}
        onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.1)"; }}
      >
        &times;
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "100%",
          maxHeight: "90vh",
          objectFit: "contain",
          borderRadius: "0.5rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          cursor: "default",
          animation: "imgZoom 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}

function CarouselModal({ images, isOpen, onClose }) {
  const [current, setCurrent] = React.useState(0);

  // Reset index when opening
  React.useEffect(() => {
    if (isOpen) setCurrent(0);
  }, [isOpen]);

  // Handle Keyboard
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeys = (e) => {
      if (e.key === "ArrowRight") setCurrent(c => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent(c => (c - 1 + images.length) % images.length);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [isOpen, images.length, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  const next = (e) => { e.stopPropagation(); setCurrent((current + 1) % images.length); };
  const prev = (e) => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0, 0, 0.9)",
        backdropFilter: "blur(15px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        animation: "modalFade 0.3s ease-out",
      }}
    >
      <style>{`
        @keyframes modalFade {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(15px); }
        }
        @keyframes imgSlide {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          color: "#fff",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1001,
        }}
      >
        &times;
      </button>

      {/* Prev Arrow */}
      {images.length > 1 && (
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: "2rem",
            background: "rgba(255,255,255,0.05)",
            border: "none",
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
            transition: "all 0.3s ease",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      )}

      {/* Main Container */}
      <div
        style={{
          position: "relative",
          maxWidth: "100%",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem"
        }}
      >
        <img
          key={current} // Key forces animation on slide change
          src={images[current]}
          alt={`Platform slide ${current + 1}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "0.5rem",
            boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
            animation: "imgSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Counter and Labels */}
        <div style={{ color: "#fff", fontFamily: "Inter", fontSize: "0.9rem", fontWeight: 500, opacity: 0.8, letterSpacing: "0.05em" }}>
          {current + 1} / {images.length}
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {images.map((_, i) => (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                style={{
                  width: i === current ? "1.5rem" : "0.5rem",
                  height: "0.5rem",
                  borderRadius: "999px",
                  background: i === current ? "#fff" : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Next Arrow */}
      {images.length > 1 && (
        <button
          onClick={next}
          style={{
            position: "absolute",
            right: "2rem",
            background: "rgba(255,255,255,0.05)",
            border: "none",
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
            transition: "all 0.3s ease",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PartyListDetail() {
  const { id } = useParams();
  const partyId = id ? id.toLowerCase() : "beats";
  const sections = PARTY_DATA[partyId] || PARTY_DATA.beats;
  const teamInfo = PARTY_LABELS[partyId] || PARTY_LABELS.beats;

  const [titleHovered, setTitleHovered] = React.useState(false);
  const [isOrgModalOpen, setIsOrgModalOpen] = React.useState(false);
  const [isPlatformModalOpen, setIsPlatformModalOpen] = React.useState(false);

  // Handle Escape key for modals
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOrgModalOpen(false);
        setIsPlatformModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <StickyHeader />
      <RoleNavbar
        sections={sections}
        onSectionClick={() => {
          setIsOrgModalOpen(false);
          setIsPlatformModalOpen(false);
        }}
      />

      {/* Team Header Section */}
      <section
        style={{
          width: "100%",
          minHeight: "55vh", // Increased from 48vh to ensure buttons are visible
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            fontSize: "clamp(10rem, 35vw, 45rem)",
            fontWeight: 900,
            fontFamily: "Inter, sans-serif",
            color: "rgba(255,255,255,0.03)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {teamInfo.label}
        </span>

        <h1
          onMouseEnter={() => setTitleHovered(true)}
          onMouseLeave={() => setTitleHovered(false)}
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: "clamp(4rem, 15vw, 15rem)",
            fontWeight: 900,
            color: titleHovered ? "#fff" : "rgba(255,255,255,0.9)",
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            margin: "0 0 2rem 0", // Give the h1 some space
            fontFamily: "Inter, sans-serif",
            transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            transform: titleHovered ? "scale(1.05)" : "scale(1)",
            textShadow: titleHovered
              ? "0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)"
              : "none",
            userSelect: "none",
          }}
        >
          {teamInfo.label}
        </h1>

        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            position: "relative",
            zIndex: 2,
            transition: "all 0.5s ease"
          }}
        >
          <ActionButton
            text="Organizational Chart"
            onClick={() => setIsOrgModalOpen(true)}
          />
          <ActionButton
            text="Platform"
            onClick={() => setIsPlatformModalOpen(true)}
          />
        </div>


      </section>

      {/* Role Sections */}
      {sections.map((section, i) => (
        <Section
          key={section.title}
          section={section}
          isLast={i === sections.length - 1}
          onMemberClick={handleMemberClick}
          initialFacing="right"
        />
      ))}

      <Footer />

      {/* Modal Overlays (Moved to bottom to fix stacking context) */}
      <ImageModal
        src={teamInfo.orgChart}
        alt={`${teamInfo.label} Organizational Chart`}
        isOpen={isOrgModalOpen}
        onClose={() => setIsOrgModalOpen(false)}
      />

      <CarouselModal
        images={teamInfo.platformImages}
        isOpen={isPlatformModalOpen}
        onClose={() => setIsPlatformModalOpen(false)}
      />

      {/* Popup Overlay */}
      {popupData && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-8"
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
