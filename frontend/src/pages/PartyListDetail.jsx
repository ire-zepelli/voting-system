import React, { useState } from "react";
import MemberCardRow from "../components/partylist/MemberCardRow";

// ─── Static sections ──────────────────────────────────────────────────────────
const SECTIONS = [
  {
    title: "EXECUTIVES",
    members: [
      { position: "Secretary",             photo: null },
      { position: "VP-Internal",           photo: null },
      { position: "President",             photo: null },
      { position: "VP-External",           photo: null },
      { position: "Treasurer",             photo: null },
    ],
  },
  {
    title: "CHIEFS",
    members: [
      { position: "Public Information Officer",    photo: null },
      { position: "Chief of Representative",       photo: null },
      { position: "Chief of Creatives",            photo: null },
      { position: "Auditor",                       photo: null },
      { position: "Chief of Students Development", photo: null },
    ],
  },
  {
    title: "REPRESENTATIVES",
    members: [
      { position: "Academic Representative", photo: null },
      { position: "CARES Representative",    photo: null },
    ],
  },
];

// ─── Section slide ────────────────────────────────────────────────────────────
function SectionSlide({ section }) {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      {/* Ghost title */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 0, whiteSpace: "nowrap",
        fontSize: "clamp(8rem, 22vw, 20rem)",
        fontWeight: 900, fontFamily: "'Arial Black','Arial',sans-serif",
        color: "rgba(255,255,255,0.06)",
        lineHeight: 1, letterSpacing: "-0.04em",
        userSelect: "none", pointerEvents: "none",
      }}>
        {section.title}
      </div>

      {/* Main title */}
      <div style={{
        position: "absolute", top: "28%", left: 0, right: 0,
        zIndex: 1, padding: "0 4vw", pointerEvents: "none",
      }}>
        <span style={{
          fontSize: "clamp(4rem, 12vw, 10rem)",
          fontWeight: 900, fontFamily: "'Arial Black','Arial',sans-serif",
          color: "#ffffff", lineHeight: 1, letterSpacing: "-0.03em", display: "block",
        }}>
          {section.title}
        </span>
      </div>

      {/* Member cards */}
      <div style={{
        position: "absolute", bottom: "8%",
        left: "50%", transform: "translateX(-50%)",
        width: "90%", zIndex: 2,
      }}>
        <MemberCardRow members={section.members} rowHeight="52vh" />
      </div>
    </div>
  );
}

// ─── Nav arrow ────────────────────────────────────────────────────────────────
function NavArrow({ dir, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        width: "2.4rem", height: "2.4rem", borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.25)",
        background: disabled ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)",
        color: disabled ? "rgba(255,255,255,0.2)" : "#fff",
        fontSize: "1rem", cursor: disabled ? "default" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
    >
      {dir === "prev" ? "‹" : "›"}
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PartyListDetail() {
  const [current, setCurrent] = useState(0);
  const total = SECTIONS.length;

  return (
    <div style={{
      background: "#2d0820", width: "100vw", height: "100vh",
      display: "flex", flexDirection: "column",
      fontFamily: "'Arial', sans-serif",
      overflow: "hidden",
    }}>
      {/* Slide area */}
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <div style={{
          display: "flex",
          width: `${total * 100}%`,
          height: "100%",
          transform: `translateX(-${(current / total) * 100}%)`,
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}>
          {SECTIONS.map((section, i) => (
            <div key={i} style={{ width: `${100 / total}%`, height: "100%", flexShrink: 0 }}>
              <SectionSlide section={section} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        flexShrink: 0, padding: "0.6rem 2rem 0.9rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
      }}>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <NavArrow dir="prev" disabled={current === 0}         onClick={() => setCurrent(c => c - 1)} />
          <NavArrow dir="next" disabled={current === total - 1} onClick={() => setCurrent(c => c + 1)} />
        </div>
        <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.68rem", letterSpacing: "0.08em", margin: 0 }}>
          © UCLM - PSITS DEV TEAM 2025
        </p>
      </div>
    </div>
  );
}
