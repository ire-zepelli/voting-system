import React from "react";

/**
 * MemberCard
 *
 * The person's photo floats above the card — head and upper body
 * stick out above the card's top edge, lower body sits inside.
 *
 * Props:
 *  member     { name?, position, photo? }
 *  size       "sm" | "md" | "lg"
 *  selected   boolean              — highlights card (voting page)
 *  onSelect   () => void           — click handler (voting page, optional)
 *  showName   boolean              — show name below position (default false)
 */

const SIZES = {
  sm: { fontSize: "0.6rem", nameFontSize: "0.52rem", iconSize: 24 },
  md: { fontSize: "0.72rem", nameFontSize: "0.62rem", iconSize: 32 },
  lg: { fontSize: "0.84rem", nameFontSize: "0.72rem", iconSize: 42 },
};

export default function MemberCard({
  member = {},
  size = "md",
  selected = false,
  onSelect,
  showName = false,
}) {
  const s = SIZES[size] ?? SIZES.md;
  const clickable = typeof onSelect === "function";

  return (
    /**
     * Layout (total slot height = H):
     *   Photo : top 0 → 70% of H   (head sticks out above card)
     *   Card  : 42% → 100% of H    (58% of H tall)
     *   Overlap: 42–70% = lower body sits inside card
     */
    <div
      onClick={clickable ? onSelect : undefined}
      style={{
        fontFamily: "Inter, sans-serif",
        position: "relative",
        width: "100%",
        height: "100%",
        cursor: clickable ? "pointer" : "default",
      }}
    >
      {/* ── Card body ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "58%",
          background: selected
            ? "rgba(160, 40, 100, 0.55)"
            : "rgba(44, 6, 33, 0.92)",
          border: selected
            ? "1.5px solid rgba(255,160,200,0.7)"
            : "1px solid rgba(255,255,255,0.13)",
          borderRadius: "1rem",
          boxShadow: selected
            ? "0 0 24px rgba(255,100,180,0.25)"
            : size === "lg"
              ? "0 8px 40px rgba(0,0,0,0.55)"
              : "0 4px 20px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "0.75rem",
          transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
          overflow: "visible",
        }}
      >
        {/* ── Selected checkmark badge ── */}
        {selected && (
          <div
            style={{
              position: "absolute",
              top: "0.45rem",
              right: "0.45rem",
              width: "1.15rem",
              height: "1.15rem",
              borderRadius: "50%",
              background: "rgba(255,140,190,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 12 12"
              fill="none"
              stroke="#3b0a26"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="2,6 5,9 10,3" />
            </svg>
          </div>
        )}

        {/* ── Position label ── */}
        <div style={{ textAlign: "center", padding: "0 0.4rem" }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              display: "block",
              color: "#fff",
              fontSize: s.fontSize,
              fontWeight: 600,
              letterSpacing: "0.08rm",
              lineHeight: 1.3,
            }}
          >
            {member.position}
          </span>
          {showName && member.name && (
            <span
              style={{
                display: "block",
                color: "rgba(255,255,255,0.5)",
                fontSize: s.nameFontSize,
                fontWeight: 400,
                marginTop: "0.15rem",
                lineHeight: 1.2,
              }}
            >
              {member.name}
            </span>
          )}
        </div>
      </div>

      {/* ── Photo — floats above card, head sticks out ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: size === "lg" ? "82%" : size === "sm" ? "70%" : "76%",
          height: "72%", // spans top 72% of slot; bottom 30% is inside card
          zIndex: 2,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.position}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
        ) : (
          /* Placeholder silhouette — no box, just the icon centered */
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "0.5rem 0.5rem 0 0",
            }}
          >
            <svg
              width={s.iconSize}
              height={s.iconSize}
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.15)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="5" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
