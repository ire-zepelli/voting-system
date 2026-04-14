import React from "react";

/**
 * MemberCard
 *
 * Props:
 *  member     { name?: string, position: string, photo?: string | null }
 *  size       "sm" | "md" | "lg"   — controls card height and photo overflow
 *  selected   boolean              — highlights the card (voting page)
 *  onSelect   () => void           — click handler (voting page, optional)
 *  showName   boolean              — show member name below position (default false)
 */

const SIZE = {
  sm: { photoTop: "-20%", photoW: "68%", fontSize: "0.64rem", shadow: "0 4px 18px rgba(0,0,0,0.3)" },
  md: { photoTop: "-24%", photoW: "71%", fontSize: "0.72rem", shadow: "0 5px 24px rgba(0,0,0,0.35)" },
  lg: { photoTop: "-29%", photoW: "75%", fontSize: "0.82rem", shadow: "0 8px 40px rgba(0,0,0,0.5)" },
};

export default function MemberCard({
  member = {},
  size = "md",
  selected = false,
  onSelect,
  showName = false,
}) {
  const s = SIZE[size] ?? SIZE.md;
  const clickable = typeof onSelect === "function";

  return (
    <div
      onClick={clickable ? onSelect : undefined}
      style={{
        width: "100%",
        height: "100%",
        background: selected
          ? "rgba(180, 60, 120, 0.45)"
          : "rgba(50, 8, 38, 0.82)",
        border: selected
          ? "2px solid rgba(255,160,200,0.7)"
          : "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "0.9rem",
        position: "relative",
        overflow: "visible",
        boxShadow: s.shadow,
        cursor: clickable ? "pointer" : "default",
        transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
      }}
    >
      {/* ── Photo (overflows top of card) ── */}
      <div style={{
        position: "absolute",
        top: s.photoTop,
        left: "50%",
        transform: "translateX(-50%)",
        width: s.photoW,
        aspectRatio: "3/4",
        background: "rgba(255,255,255,0.07)",
        border: selected
          ? "2px solid rgba(255,160,200,0.4)"
          : "2px dashed rgba(255,255,255,0.15)",
        borderRadius: "0.6rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition: "border-color 0.25s",
      }}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.position}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        )}
      </div>

      {/* ── Labels ── */}
      <div style={{ textAlign: "center", padding: "0 0.5rem" }}>
        <span style={{
          display: "block",
          color: "#fff",
          fontSize: s.fontSize,
          fontWeight: 600,
          letterSpacing: "0.03em",
          lineHeight: 1.3,
        }}>
          {member.position}
        </span>
        {showName && member.name && (
          <span style={{
            display: "block",
            color: "rgba(255,255,255,0.55)",
            fontSize: `calc(${s.fontSize} - 0.08rem)`,
            fontWeight: 400,
            marginTop: "0.18rem",
            lineHeight: 1.2,
          }}>
            {member.name}
          </span>
        )}
      </div>

      {/* ── Selected checkmark ── */}
      {selected && (
        <div style={{
          position: "absolute",
          top: "0.5rem", right: "0.5rem",
          width: "1.2rem", height: "1.2rem",
          borderRadius: "50%",
          background: "rgba(255,160,200,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
            stroke="#3b0a26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        </div>
      )}
    </div>
  );
}
