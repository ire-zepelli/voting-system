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
  sm: { fontSize: "0.75rem", nameFontSize: "0.65rem", iconSize: 26 },
  md: { fontSize: "0.95rem", nameFontSize: "0.80rem", iconSize: 36 },
  lg: { fontSize: "1.15rem", nameFontSize: "1.0rem", iconSize: 48 },
};

export default function MemberCard({
  member = {},
  size = "md",
  selected = false,
  onSelect,
  showName = false,
  flipX = false,
}) {
  const [hovered, setHovered] = React.useState(false);
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "Inter, sans-serif",
        position: "relative",
        width: "100%",
        height: "100%",
        cursor: clickable ? "pointer" : "default",
        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        transform: hovered ? "translateY(-12px) scale(1.04)" : "translateY(0) scale(1)",
      }}
    >
      {/* ── Card body ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "64%",
          background: selected
            ? "rgba(160, 40, 100, 0.65)"
            : hovered
              ? "rgba(54, 8, 41, 0.98)"
              : "rgba(44, 6, 33, 0.92)",
          border: selected
            ? "1.5px solid rgba(255,160,200,0.8)"
            : hovered
              ? "1px solid rgba(255,140,190,0.3)"
              : "1px solid rgba(255,255,255,0.13)",
          borderRadius: "1rem",
          boxShadow: selected
            ? "0 0 24px rgba(255,100,180,0.35)"
            : hovered
              ? "0 12px 48px rgba(0,0,0,0.6)"
              : size === "lg"
                ? "0 8px 40px rgba(0,0,0,0.55)"
                : "0 4px 20px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "1.6rem",
          transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
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

      </div>

      {/* ── Position & Name Labels — floats on top of everything ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: "1.6rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          textAlign: "center",
          zIndex: 10, // Higher than photo (zIndex: 2)
          pointerEvents: "none",
        }}
      >
        <div style={{ padding: "0 0.4rem" }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              display: "block",
              color: hovered ? "#fff" : "rgba(255,255,255,0.95)",
              fontSize: s.fontSize,
              fontWeight: 600,
              letterSpacing: "0.08em",
              lineHeight: 1.3,
              transition: "color 0.3s ease",
            }}
          >
            {member.position}
          </span>
          {showName && member.name && (
            <span
              style={{
                display: "block",
                color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
                fontSize: s.nameFontSize,
                fontWeight: 400,
                marginTop: "0.45rem",
                lineHeight: 1.2,
                letterSpacing: "normal",
                whiteSpace: "normal",
                wordBreak: "break-word",
                transition: "color 0.3s ease",
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
          transform: `translateX(-50%) scale(${flipX ? -1 : 1}, 1) scale(${hovered ? 1.08 : 1})`,
          width: size === "lg" ? "92%" : size === "sm" ? "78%" : "88%",
          height: "72%", // Pulled down slightly so only the head overlaps the title text, stopping before the text labels
          zIndex: 2,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          pointerEvents: "none",
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.position}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              filter: hovered ? "brightness(1.1) drop-shadow(0 0 15px rgba(255,140,190,0.15))" : "none",
              transition: "filter 0.4s ease",
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
              background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
              borderRadius: "0.5rem 0.5rem 0 0",
              transition: "background 0.4s ease",
            }}
          >
            <svg
              width={s.iconSize}
              height={s.iconSize}
              viewBox="0 0 24 24"
              fill={hovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)"}
              stroke={hovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)"}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "all 0.4s ease" }}
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
