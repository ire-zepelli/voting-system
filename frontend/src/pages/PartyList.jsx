import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Party data ───────────────────────────────────────────────────────────────
// To add real photos, import them at the top and set `image` to the import.
// e.g.  import beatsPhoto from "../assets/beats-team.png";
//       Then set  image: beatsPhoto
const PARTYLISTS = [
  {
    id: "beats",
    label: "BEATS",
    image: null,
    bgColor: "#3b0a26",
    fullName: "Build, Empower, And, Transform the System",
    vision:
      "A unified CCS department where every student's voice is the BEATS of our governance, ensuring an inclusive, responsive, and student centered academic experience.",
    mission: [
      "To provide a BEAT check on student welfare through regular feedback loops and mental health initiatives.",
      "To bridge the gap between year levels through peer-to-peer mentoring and collaborative coding circles.",
      "To advocate for better laboratory facilities and 24/7 digital access to learning materials for all CCS students.",
    ],
    platform: [
      {
        letter: "B",
        title: "Better Communication",
        points: [
          "Early posting/messaging of announcements in group chats",
          "Utilize bulletin boards for the announcements physically",
          "Posting announcements in the FB page",
          "Relay of messages through Mayors GC's",
        ],
      },
      {
        letter: "E",
        title: "Enhanced Student Environment",
        points: [
          "Implementation of Free Wi-Fi on certain areas around the CCS Department's classrooms and lounges.",
        ],
      },
      {
        letter: "A",
        title: "Accessible Service/s",
        points: [
          "The BEATS partylist also aims to provide printing services to the students.",
        ],
      },
      {
        letter: "T",
        title: "Transparency and Liquidation",
        points: [
          'Transparency Logs: Semestral "Transparency Reports" posted on social media detailing the partylist\'s budget spending and the progress of ongoing projects.',
        ],
      },
      {
        letter: "S",
        title: "Student Engagement",
        points: [
          "Create a shared google drive of capstone templates, sample codes, and study guides",
          "Moderated group for student experiences and peer assistance",
        ],
      },
    ],
    members: [
      { name: "Oscar, Crista Monica",     position: "President",                   photo: null },
      { name: "Pogoy, Dan Pierre",          position: "Vice-President Internal",    photo: null },
      { name: "Pacumio, Ryan",              position: "Vice-President External",    photo: null },
      { name: "Lapeña, May",               position: "Secretary",                  photo: null },
      { name: "Monilar, Fiona",            position: "PIO",                        photo: null },
      { name: "Latonio, Keith Ramises",    position: "Treasurer",                  photo: null },
      { name: "Conde, Harry",              position: "Chief of Creatives",         photo: null },
      { name: "Apawan, Emmanuel Franz",    position: "Auditor",                    photo: null },
      { name: "Cuysona, Jhoviegen",        position: "Chief of Representative",    photo: null },
      { name: "Cogal, Aimee Gayle",        position: "Chief of Students Development", photo: null },
      { name: "Resurreccion, Rose Anne",   position: "Academic Representative",    photo: null },
      { name: "Patalinghug, Mary Grace",   position: "Cares Representative",       photo: null },
    ],
  },
  {
    id: "peak",
    label: "PEAK",
    image: null,
    bgColor: "#2d0820",
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
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "rgba(255,255,255,0.05)",
      border: "2px dashed rgba(255,255,255,0.15)",
      borderRadius: "0.75rem", gap: "0.6rem",
    }}>
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none"
        stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.68rem", letterSpacing: "0.1em" }}>
        TEAM PHOTO
      </span>
    </div>
  );
}

// ─── Single partylist row ─────────────────────────────────────────────────────
function PartyRow({ party, hovered, onEnter, onLeave, onClick }) {
  const isHovered = hovered === party.id;
  const isOther   = hovered !== null && !isHovered;
  const T = "all 0.55s cubic-bezier(0.4,0,0.2,1)";

  return (
    <div onClick={() => onClick(party.id)}
      onMouseEnter={() => onEnter(party.id)}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        flex: isHovered ? 1.5 : isOther ? 0.6 : 1,
        overflow: "hidden",
        background: party.bgColor,
        cursor: "pointer",
        transition: T,
        filter: isOther ? "brightness(0.5)" : "brightness(1)",
      }}>
      {/* Giant name — behind photo (z-index 1) */}
      <span aria-hidden="true" style={{
        position: "absolute",
        bottom: isHovered ? "-0.08em" : "0.04em",
        left: isHovered ? "-0.02em" : "0.5rem",
        zIndex: 1,
        fontSize: isHovered ? "clamp(9rem,25vw,21rem)" : "clamp(4.5rem,13vw,11rem)",
        fontWeight: 900,
        fontFamily: "'Arial Black','Arial',sans-serif",
        color: isHovered ? "#ffffff" : "rgba(255,255,255,0.85)",
        lineHeight: 1, letterSpacing: "-0.03em",
        userSelect: "none", whiteSpace: "nowrap",
        transition: "font-size 0.55s cubic-bezier(0.4,0,0.2,1), bottom 0.55s cubic-bezier(0.4,0,0.2,1), left 0.55s cubic-bezier(0.4,0,0.2,1), color 0.4s",
        pointerEvents: "none",
      }}>
        {party.label}
      </span>
      {/* Team photo — on top of name (z-index 2) */}
      <div style={{
        position: "absolute", right: 0, bottom: 0,
        width: isHovered ? "70%" : "55%",
        height: "100%", zIndex: 2, transition: T,
      }}>
        {party.image ? (
          <img src={party.image} alt={`${party.label} partylist`} style={{
            position: "absolute", bottom: 0, right: 0,
            height: "100%", width: "100%",
            objectFit: "cover", objectPosition: "top center",
            maskImage: "linear-gradient(to right, transparent 0%, black 28%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%)",
          }}/>
        ) : (
          <div style={{
            position: "absolute", bottom: "1.2rem", right: "1.5rem",
            width: "calc(100% - 3rem)", height: "calc(100% - 2.4rem)",
          }}>
            <TeamPhotoPlaceholder />
          </div>
        )}
      </div>
      {/* Left gradient for readability */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 50%)",
        pointerEvents: "none",
      }}/>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export const PartyList = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{
      background: "#2d0820",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Arial', sans-serif",
    }}>
      {/* Header */}
      <div style={{ padding: "1.2rem 2rem 0.4rem", flexShrink: 0 }}>
        <p style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "1rem", fontWeight: 600,
          letterSpacing: "0.02em", margin: 0,
        }}>
          2025 Election Partylist
        </p>
      </div>

      {/* Partylist rows */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        minHeight: 0, height: "calc(100vh - 3.5rem)",
      }}>
        {PARTYLISTS.map((party) => (
          <PartyRow key={party.id} party={party} hovered={hovered}
            onEnter={setHovered} onLeave={() => setHovered(null)}
            onClick={(id) => navigate(`/partylist/${id}`)}
          />
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: "center", padding: "0.75rem",
        color: "rgba(255,255,255,0.3)", fontSize: "0.72rem",
        letterSpacing: "0.06em", background: "#1a0410", flexShrink: 0,
      }}>
        © UCLM - PSITS DEV TEAM 2025
      </footer>
    </div>
  );
};

export default PartyList;
