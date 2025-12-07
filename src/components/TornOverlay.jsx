import { useMemo } from "react";
import { motion } from "framer-motion";

const lines = [
  "lim (n→∞) T(n)/n = 0",
  "shadow copy created without intent",
  "the pointer was never null",
  "stack frame leaked… yet survived",
  "entropy rising beyond threshold",
  "invariant maintained successfully",
  ">>> unresolved reference detected",
  "01010111 01101000 01111001?",
  "ghost thread awakened",
  "segmentation fault avoided (barely)",
  "pointer reassigned without consent",
  "state mutated — who did that?",
  "heap grew when no one was looking",
  "ghost thread scheduled at midnight",
  "unreachable code… reached",
  "stack overflow predicted early",
  "cache hit (unexpectedly)",
  "critical section? never critical",
  "deadlock avoided through sheer luck",
  "race condition won by the slower thread",
  "0xDEAD wasn’t dead after all",
  "bits flipped without witnesses",
  "checksum altered by cosmic rays",
  "packet arrived before it was sent",
  "branch mispredicted with confidence",
  "flags set during a dream",
  "undefined behavior granted clarity",
  "0001 became 0110 (no explanation)",
  "shadow register whispered the answer",
  "segfault negotiated peacefully"
];

export default function TornOverlay() {
  const scribbles = useMemo(() => {
    const isDark = document.documentElement.classList.contains("dark");

    const minOpacity = isDark ? 0.35 : 0.15;
    const maxOpacity = isDark ? 0.65 : 0.35;

    const count = Math.floor(Math.random() * 2) + 2; 

    const zones = Array.from({ length: count }, (_, i) => ({
      xMin: (i * 100) / count,
      xMax: ((i + 1) * 100) / count,
    }));

    return zones.map((zone) => ({
      text: lines[Math.floor(Math.random() * lines.length)],

      left: `${zone.xMin + Math.random() * (zone.xMax - zone.xMin - 15) + 8}%`,

      top: `${30 + Math.random() * 40}%`, 

      opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
      rotate: Math.random() * 6 - 3,
      scale: Math.random() * 0.2 + 0.9,
    }));
  }, []);

  return (
    <>
      {scribbles.map((s, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: s.opacity }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            transform: `rotate(${s.rotate}deg) scale(${s.scale})`,
            fontFamily: "EasterEggFont, monospace",
            fontSize: "1.05rem",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            color: "black",
          }}
        >
          {s.text}
        </motion.p>
      ))}
    </>
  );
}
