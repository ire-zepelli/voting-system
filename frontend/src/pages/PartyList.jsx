import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// ─── Party data ───────────────────────────────────────────────────────────────
// To add real photos, import them at the top and set `image` to the import.
// e.g.  import beatsPhoto from "../assets/beats-team.png";
//       Then set  image: beatsPhoto
const PARTYLISTS = [
  {
    id: "beats",
    label: "B.E.A.T.S.",
    image: null,
    bgColor: "#34102A",
    fullName: "",
    vision: "",
    mission: [],
    platform: [],
    members: [],
  },
  {
    id: "peak",
    label: "P.E.A.K.",
    image: null,
    bgColor: "#34102A",
    fullName: "",
    vision: "",
    mission: [],
    platform: [],
    members: [],
  },
];

// ─── Team photo placeholder ───────────────────────────────────────────────────
function TeamPhotoPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.05)",
        border: "2px dashed rgba(255,255,255,0.15)",
        borderRadius: "0.75rem",
        gap: "0.6rem",
      }}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.68rem",
          letterSpacing: "-3%",
        }}
      >
        TEAM PHOTO
      </span>
    </div>
  );
}

// ─── Single partylist row ─────────────────────────────────────────────────────
function PartyRow({ party, hovered, onEnter, onLeave, onClick }) {
  const isHovered = hovered === party.id;
  const isOther = hovered !== null && !isHovered;
  const T = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";

  return (
    <div
      onClick={() => onClick(party.id)}
      onMouseEnter={() => onEnter(party.id)}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        flex: 1, // Fixed size, unimplement the flex changing
        overflow: "hidden",
        background: party.bgColor, // Unimplement darkening
        cursor: "pointer",
        transition: T,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Giant name */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: isHovered ? "50%" : "2rem",
          transform: isHovered ? "translate(-50%, -50%)" : "translate(0, -50%)",
          zIndex: 1,
          fontSize: isHovered
            ? "clamp(10rem,30vw,25rem)"
            : "clamp(5rem,15vw,12rem)",
          fontWeight: "bold",
          fontFamily: "Inter, sans-serif",
          color: isHovered ? "rgba(255,255,255,0.08)" : "#ffffff",
          lineHeight: "120%",
          letterSpacing: "-0.08em", // Using em to ensure the sticked appearance in CSS
          userSelect: "none",
          whiteSpace: "nowrap",
          transition: T,
          pointerEvents: "none",
        }}
      >
        {party.label}
      </span>
      {/* Team photo */}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: isHovered ? "100%" : "60%",
          height: "100%",
          zIndex: 2,
          display: "flex",
          justifyContent: isHovered ? "center" : "flex-end",
          transition: T,
        }}
      >
        {party.image ? (
          <img
            src={party.image}
            alt={`${party.label} partylist`}
            style={{
              height: "100%",
              width: isHovered ? "70%" : "100%",
              objectFit: "cover",
              objectPosition: "top center",
              transition: T,
              maskImage: isHovered
                ? "none"
                : "linear-gradient(to right, transparent 0%, black 28%)",
              WebkitMaskImage: isHovered
                ? "none"
                : "linear-gradient(to right, transparent 0%, black 28%)",
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: isHovered ? "center" : "flex-end",
              width: "100%",
              height: "100%",
              paddingRight: isHovered ? 0 : "2rem",
              paddingBottom: "1.2rem",
            }}
          >
            <div style={{ width: "250px", height: "250px", transition: T }}>
              <TeamPhotoPlaceholder />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export const PartyList = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div
        style={{
          background: "#34102A",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Arial', sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ padding: "1.2rem 2rem 0.4rem", flexShrink: 0 }}>
          <h1 className="text-[50px] font-bold text-white mb-6 tracking-tight">
            2026 Election Partylist
          </h1>
        </div>

        {/* Partylist rows */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            height: "calc(100vh - 3.5rem)",
          }}
        >
          {PARTYLISTS.map((party) => (
            <PartyRow
              key={party.id}
              party={party}
              hovered={hovered}
              onEnter={setHovered}
              onLeave={() => setHovered(null)}
              onClick={(id) => navigate(`/partylist/${id}`)}
            />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PartyList;
