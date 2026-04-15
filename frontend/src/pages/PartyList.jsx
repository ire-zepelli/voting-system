import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── Party data ───────────────────────────────────────────────────────────────
const PARTYLISTS = [
  {
    id: "beats",
    label: "B.E.A.T.S.",
    image: "/BEATS/GROUP PHOTO/beatsgrouptransparent.png",
    bgColor: "#34102A",
    accentColor: "#c0547a",
    imageScale: 1.55,
    imageOffsetY: "-32%",      // Resting: pull photo up
    imageHoverOffsetY: "-15.5%", // Hover: lighter shift so photo isn't cut
  },
  {
    id: "peak",
    label: "P.E.A.K.",
    image: "/PEAK/GROUP PHOTO/peakgrouptransparent.png",
    bgColor: "#34102A",
    accentColor: "#5493c0",
    imageOffsetY: "-7%",       // Resting: slight upward nudge
    imageHoverOffsetY: "-3%",  // Hover: barely any shift
  },
];

// ─── Team photo placeholder ───────────────────────────────────────────────────
function TeamPhotoPlaceholder() {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.05)",
      border: "2px dashed rgba(255,255,255,0.15)",
      borderRadius: "0.75rem",
      gap: "0.6rem"
    }}>
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
      <span style={{
        fontFamily: "Inter, sans-serif",
        color: "rgba(255,255,255,0.25)",
        fontSize: "0.68rem",
        letterSpacing: "0.1em"
      }}>TEAM PHOTO</span>
    </div>
  );
}

// ─── Arrow button ─────────────────────────────────────────────────────────────
function ArrowButton({ direction, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "3.2rem",
        height: "3.2rem",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.2)",
        background: hov ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)",
        color: disabled ? "rgba(255,255,255,0.2)" : "#fff",
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.25s cubic-bezier(0.25,1,0.5,1)",
        transform: hov && !disabled ? "scale(1.08)" : "scale(1)",
        outline: "none",
        flexShrink: 0
      }}
      aria-label={direction === "left" ? "Previous party" : "Next party"}
    >
      {direction === "left" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );
}

// ─── Carousel slide ───────────────────────────────────────────────────────────
function CarouselSlide({ party, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const T = "all 0.75s cubic-bezier(0.25, 1, 0.5, 1)";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#34102A",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer",
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
        transition: "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Giant background label */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "2rem",
          transform: hovered
            ? "translate(10%, -50%) scale(2.2)"
            : "translate(0%, -50%) scale(1)",
          transformOrigin: "left center",
          zIndex: hovered ? 1 : 10,
          fontSize: "clamp(6rem, 18vw, 14rem)",
          fontWeight: "bold",
          fontFamily: "Inter, sans-serif",
          color: hovered ? "rgba(255,255,255,0.06)" : "#ffffff",
          lineHeight: "120%",
          letterSpacing: "-0.08em",
          userSelect: "none",
          whiteSpace: "nowrap",
          transition: "transform 0.75s cubic-bezier(0.25, 1, 0.5, 1), color 0.75s cubic-bezier(0.25, 1, 0.5, 1)",
          willChange: "transform, color",
          pointerEvents: "none"
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
          width: hovered ? "100%" : "60%",
          height: "100%",
          zIndex: hovered ? 10 : 1,
          display: "flex",
          justifyContent: hovered ? "center" : "flex-end",
          transition: "width 0.75s cubic-bezier(0.25, 1, 0.5, 1)",
          willChange: "width",
          pointerEvents: "none"
        }}
      >
        {party.image ? (
          <img
            src={party.image}
            alt={`${party.label} partylist`}
            style={{
              height: hovered
                ? `${115 * (party.imageScale ?? 1)}%`
                : `${108 * (party.imageScale ?? 1)}%`,
              width: hovered ? "80%" : "100%",
              objectFit: "contain",
              objectPosition: "bottom center",
              opacity: hovered ? 1 : 0.45,
              transform: hovered
                ? `scale(1.05) translateY(${party.imageHoverOffsetY ?? "0%"})`
                : `scale(1) translateY(${party.imageOffsetY ?? "0%"})`,
              transformOrigin: "bottom center",
              transition: T,
              maskImage: hovered
                ? "none"
                : "linear-gradient(to right, transparent 0%, black 28%)",
              WebkitMaskImage: hovered
                ? "none"
                : "linear-gradient(to right, transparent 0%, black 28%)"
            }}
          />
        ) : (
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: hovered ? "center" : "flex-end",
            width: "100%",
            height: "100%",
            paddingRight: hovered ? 0 : "2rem",
            paddingBottom: "1.2rem"
          }}>
            <div style={{ height: hovered ? "85%" : "65%", aspectRatio: "16/9", maxWidth: "100%", transition: T }}>
              <TeamPhotoPlaceholder />
            </div>
          </div>
        )}
      </div>

      {/* "View Party" hint that appears on hover */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "2rem",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          pointerEvents: "none"
        }}
      >
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.05em",
          textTransform: "uppercase"
        }}>
          View Party
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export const PartyList = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const total = PARTYLISTS.length;

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  return (
    <>
      <div style={{
        background: PARTYLISTS[current].bgColor,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        transition: "background 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
      }}>
        {/* Sticky Header */}
        <div style={{ position: "relative", zIndex: 50, background: "transparent", flexShrink: 0 }}>
          <Header />
        </div>

        {/* Title bar */}
        <div style={{ padding: "1rem 2rem 0.75rem", flexShrink: 0, position: "relative", zIndex: 40 }}>
          <h1 style={{
            margin: 0,
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.03em",
            fontFamily: "Inter, sans-serif"
          }}>
            2026 Election Partylist
          </h1>
        </div>

        {/* Carousel area */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {PARTYLISTS.map((party, idx) => (
            <CarouselSlide
              key={party.id}
              party={party}
              active={idx === current}
              onClick={() => navigate(`/partylist/${party.id}`)}
            />
          ))}

          {/* Left / Right controls */}
          <div style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}>
            <ArrowButton direction="left" onClick={prev} disabled={total <= 1} />

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {PARTYLISTS.map((party, idx) => (
                <button
                  key={`dot-${party.id}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to ${party.label}`}
                  style={{
                    width: idx === current ? "1.8rem" : "0.5rem",
                    height: "0.5rem",
                    borderRadius: "9999px",
                    background: idx === current ? "#fff" : "rgba(255,255,255,0.35)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
                    padding: 0,
                    outline: "none"
                  }}
                />
              ))}
            </div>

            <ArrowButton direction="right" onClick={next} disabled={total <= 1} />
          </div>

          {/* Party counter top-right */}
          <div style={{
            position: "absolute",
            top: "1.2rem",
            right: "2rem",
            zIndex: 30,
            fontFamily: "Inter, sans-serif",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.08em",
            userSelect: "none"
          }}>
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
