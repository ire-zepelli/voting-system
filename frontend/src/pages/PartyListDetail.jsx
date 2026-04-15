import React from "react";
import { Link, useParams } from "react-router-dom";
import MemberCardRow from "../components/partylist/MemberCardRow";
import Footer from "../components/Footer";

const PARTY_DATA = {
  beats: [
    {
      title: "EXECUTIVES",
      members: [
        { name: "May Lapeña", position: "Secretary", photo: "/BEATS/TRANSPARENT_INDIV/LAPENA_SECRETARY.png" },
        { name: "Dan Pierre Pogoy", position: "Vice-President Internal", photo: "/BEATS/TRANSPARENT_INDIV/POGOY_VP_INTERNAL.png" },
        { name: "Crista Monica Oscar", position: "President", photo: "/BEATS/TRANSPARENT_INDIV/OSCAR_PRES.png" },
        { name: "Ryan Pacumio", position: "Vice-President External", photo: "/BEATS/TRANSPARENT_INDIV/PACUMIO_VP_EXTERNAL.png" },
        { name: "Keith Ramises Latonio", position: "Treasurer", photo: "/BEATS/TRANSPARENT_INDIV/LATONIO_TREASURER.png" },
      ],
    },
    {
      title: "CHIEFS",
      members: [
        { name: "Fiona Monilar", position: "Public Information Officer", photo: "/BEATS/TRANSPARENT_INDIV/MONILAR_PIO.png" },
        { name: "Jhoviegen Cuysona", position: "Chief of Representative", photo: "/BEATS/TRANSPARENT_INDIV/CUYSONA_CHIEF_OF_REP.png" },
        { name: "Harry Conde", position: "Chief of Creatives", photo: "/BEATS/TRANSPARENT_INDIV/CONDE_CHIEF_OF_CREATIVES.png" },
        { name: "Emmanuel Franz Apawan", position: "Auditor", photo: "/BEATS/TRANSPARENT_INDIV/APAWAN_AUDITOR.png" },
        { name: "Aimee Gayle Cogal", position: "Chief of Students Development", photo: "/BEATS/TRANSPARENT_INDIV/COGAL_CHIEF_OF_STUDENTDEV.png" },
      ],
    },
    {
      title: "REPRESENTATIVES",
      members: [
        { name: "Rose Anne Resureccion", position: "Academic Representative", photo: "/BEATS/TRANSPARENT_INDIV/RESURRECCION_ACADEMIC_REP.png" },
        { name: "Mary Grace Patalinghug", position: "CARES Representative", photo: "/BEATS/TRANSPARENT_INDIV/PATALINGHUG_CARE_REP.png" },
      ],
    },
  ],
  peak: [
    {
      title: "EXECUTIVES",
      members: [
        { name: "Diane Mendoza", position: "Secretary", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/SECRETARY - MENDOZA_.png" },
        { name: "Altheia Dano", position: "Vice-President Internal", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP INTERNAL- DANO.png" },
        { name: "Darren Villanueva", position: "President", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/PRES- VILLANUEVA_.png" },
        { name: "Kane Huxley Book", position: "Vice-President External", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP EXTERNAL - BOOK.png" },
        { name: "Hanny Jane Enriquez", position: "Treasurer", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/TREASURER - ENRIQUEZ_.png" },
      ],
    },
    {
      title: "CHIEFS",
      members: [
        { name: "Jea Mary Trixy Magalland", position: "Public Information Officer", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/P.I OFFICER- MAGALLANO.png" },
        { name: "Abijah Shen Regado", position: "Chief of Representative", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/REPRESENTATIVE - REGADO.png" },
        { name: "Tristhan Mark Vincent Villamor", position: "Chief of Creatives", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CREATIVES - VILLAMOR_.png" },
        { name: "Myka Angela Dumael", position: "Auditor", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/AUDIT- DUMAEL.png" },
        { name: "Jeoff Andrew Demecillo", position: "Chief of Students Development", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/DEVELOPMENT - DEMECILLO.png" },
      ],
    },
    {
      title: "REPRESENTATIVES",
      members: [
        { name: "Nathaniel Ornopia", position: "CARES Representative", photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CARES REP- ORNOPIA.png" },
      ],
    },
  ],
};

// ─── One full-viewport section ────────────────────────────────────────────────
function Section({ section, isLast }) {
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
        />
      ))}

      <Footer />
    </div>
  );
}
