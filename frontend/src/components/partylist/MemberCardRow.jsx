import React, { useEffect, useRef } from "react";
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
  const scrollRef = useRef(null);

  useEffect(() => {
    // When elements mount on a narrow (mobile) viewport, scroll to the center card (index 2)
    if (scrollRef.current && members.length > 2) {
      setTimeout(() => {
        if (window.innerWidth < 640 && scrollRef.current.children[2]) {
          scrollRef.current.children[2].scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
        }
      }, 100);
    }
  }, [members.length]);

  return (
    <div 
      ref={scrollRef}
      className="w-full flex items-end justify-start sm:justify-center gap-4 sm:gap-6 pb-6 pt-4 px-6 sm:px-0 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scroll-smooth hide-scrollbar"
         style={{ height: rowHeight }}>
      {members.slice(0, 5).map((member, i) => {
        const centerIndex = Math.floor(members.length / 2);
        // Manual override takes precedence, otherwise use positional logic
        const shouldFlip = typeof member.flip === "boolean"
          ? member.flip
          : (initialFacing === "right" ? i > centerIndex : i < centerIndex);

        return (
          <div key={i} className="flex-none sm:flex-1 snap-center w-[75vw] sm:w-auto sm:max-w-[20%] h-[88%] min-w-0 relative">
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
