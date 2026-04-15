import React from "react";
import { Link, useParams } from "react-router-dom";
import MemberCardRow from "../components/partylist/MemberCardRow";
import Footer from "../components/Footer";
import { PARTY_MEMBER_SECTIONS } from "../data/election";

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
  const sections = PARTY_MEMBER_SECTIONS[partyId] || PARTY_MEMBER_SECTIONS.beats;

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
