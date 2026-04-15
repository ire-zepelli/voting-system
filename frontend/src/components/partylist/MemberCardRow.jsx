import React from "react";
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
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: "1.5rem",
      width: "100%",
      height: rowHeight,
    }}>
      {members.slice(0, 5).map((member, i) => {
        const centerIndex = Math.floor(members.length / 2);
        // Manual override takes precedence, otherwise use positional logic
        const shouldFlip = typeof member.flip === "boolean"
          ? member.flip
          : (initialFacing === "right" ? i > centerIndex : i < centerIndex);

        return (
          <div key={i} style={{
            flex: "1 1 0",
            maxWidth: "20%",
            height: "88%",
            minWidth: 0,
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
