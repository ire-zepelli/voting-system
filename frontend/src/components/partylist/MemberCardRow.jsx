import React from "react";
import MemberCard from "./MemberCard";

/**
 * MemberCardRow
 *
 * Renders up to 5 member cards in a fan/arc layout.
 * The center slot is always tallest; outer slots step down.
 * If fewer than 5 members are supplied they are centred automatically.
 *
 * Props:
 *  members      array of { name?, position, photo? }   (max 5)
 *  selectedIds  array of indexes that are selected      (voting page)
 *  onSelect     (index: number) => void                 (voting page, optional)
 *  showName     boolean   — pass through to MemberCard  (default false)
 *  rowHeight    string    — CSS height of the whole row (default "52vh")
 */

// Height scale for each slot in a 5-card row (index 0 = leftmost)
const SLOT_SCALE  = [0.52, 0.70, 0.88, 0.70, 0.52];
const SLOT_SIZE   = ["sm", "md", "lg", "md", "sm"];
const SLOT_FLEX   = ["0 0 14%", "0 0 15%", "0 0 18%", "0 0 15%", "0 0 14%"];

export default function MemberCardRow({
  members = [],
  selectedIds = [],
  onSelect,
  showName = false,
  rowHeight = "52vh",
}) {
  const total = Math.min(members.length, 5);
  // Offset so the group is centred within the 5 slots
  const centerOffset = Math.floor((5 - total) / 2);

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: "1.2rem",
      width: "100%",
      height: rowHeight,
    }}>
      {members.slice(0, 5).map((member, i) => {
        const slot  = centerOffset + i;
        const scale = SLOT_SCALE[slot] ?? 0.70;
        const size  = SLOT_SIZE[slot]  ?? "md";
        const flex  = SLOT_FLEX[slot]  ?? "0 0 14%";

        return (
          <div
            key={i}
            style={{
              flex,
              height: `${scale * 100}%`,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <MemberCard
              member={member}
              size={size}
              selected={selectedIds.includes(i)}
              onSelect={onSelect ? () => onSelect(i) : undefined}
              showName={showName}
            />
          </div>
        );
      })}
    </div>
  );
}
