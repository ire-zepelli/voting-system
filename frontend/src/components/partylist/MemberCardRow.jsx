import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";

/**
 * MemberCardRow
 *
 * Renders up to 5 member cards in a fan/stepped layout.
 *
 * Props:
 *  members      { name?, position, photo? }[]   max 5
 *  selectedIds  number[]    selected indexes     (voting page)
 *  onSelect     (i) => void                      (voting page, optional)
 *  showName     boolean                          passed to MemberCard
 *  rowHeight    string      CSS height of row    default "420px"
 */

export default function MemberCardRow({
  members = [],
  selectedIds = [],
  onSelect,
  showName = false,
  rowHeight = "420px",
  initialFacing = "right", // "right" or "left"
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: isMobile ? "flex-start" : "flex-end",
      justifyContent: "center",
      gap: isMobile ? "1rem" : "1.5rem",
      width: "100%",
      height: isMobile ? "auto" : rowHeight,
      minHeight: isMobile ? rowHeight : "0",
      padding: isMobile ? "1rem 0" : 0,
    }}>
      {members.slice(0, 5).map((member, i) => {
        const centerIndex = Math.floor(members.length / 2);
        // Manual override takes precedence, otherwise use positional logic
        const shouldFlip = typeof member.flip === "boolean"
          ? member.flip
          : (initialFacing === "right" ? i > centerIndex : i < centerIndex);

        return (
          <div key={i} style={{
            flex: isMobile ? "0 1 150px" : "1 1 0",
            maxWidth: isMobile ? "45%" : "20%",
            height: isMobile ? "300px" : "88%",
            minWidth: 0,
            marginBottom: isMobile ? "1rem" : 0,
          }}>
            <MemberCard
              member={member}
              size="md"
              selected={selectedIds.includes(i)}
              onSelect={onSelect ? () => onSelect(i) : undefined}
              showName={showName}
              flipX={shouldFlip}
            />
          </div>
        );
      })}
    </div>
  );
}
