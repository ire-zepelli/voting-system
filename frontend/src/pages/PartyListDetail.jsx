import React from "react";
import { Link } from "react-router-dom";
import MemberCardRow from "../components/partylist/MemberCardRow";
import Footer from "../components/Footer";
/**
 * PartyListDetail
 *
 * Single scrollable page. Each role group (EXECUTIVES, CHIEFS,
 * REPRESENTATIVES) occupies one full-viewport section.
 * No slider — just scroll.
 */

const SECTIONS = [
  {
    title: "EXECUTIVES",
    members: [
      { position: "Secretary", photo: null },
      { position: "VP-Internal", photo: null },
      { position: "President", photo: null },
      { position: "VP-External", photo: null },
      { position: "Treasurer", photo: null },
    ],
  },
  {
    title: "CHIEFS",
    members: [
      { position: "Public Information Officer", photo: null },
      { position: "Chief of Representative", photo: null },
      { position: "Chief of Creatives", photo: null },
      { position: "Auditor", photo: null },
      { position: "Chief of Students Development", photo: null },
    ],
  },
  {
    title: "REPRESENTATIVES",
    members: [
      { position: "Academic Representative", photo: null },
      { position: "CARES Representative", photo: null },
    ],
  },
];

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
            top: "20%",
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
            width: "92%",
            margin: "0 auto",
            paddingTop: "18vh", // breathing room for photos to overflow up
            paddingBottom: "6vh",
          }}
        >
          <MemberCardRow
            members={section.members}
            rowHeight="clamp(260px, 42vh, 460px)"
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
      <StickyHeader />

      {SECTIONS.map((section, i) => (
        <Section
          key={section.title}
          section={section}
          isLast={i === SECTIONS.length - 1}
        />
      ))}

      <Footer />
    </div>
  );
}
