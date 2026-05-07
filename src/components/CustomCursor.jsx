import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || location.pathname.startsWith("/admin")) {
      document.documentElement.style.setProperty('cursor', 'auto', 'important');
      return;
    }

    document.documentElement.style.setProperty('cursor', 'none', 'important');

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const hoverElements = document.querySelectorAll(
      "button, a, .card, .hover-target"
    );

    const handleMouseEnter = () => setHovering(true);
    const handleMouseLeave = () => setHovering(false);

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", move);
    
    return () => {
      window.removeEventListener("mousemove", move);
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      document.documentElement.style.setProperty('cursor', 'auto', 'important');
    };
  }, [isMobile, location.pathname]);

  if (isMobile || location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Outer Halo */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: hovering ? 2 : 1,
          opacity: hovering ? 0.35 : 0.2,
        }}
        transition={{ type: "spring", mass: 0.3, damping: 15 }}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8), rgba(255,255,255,0.05))",
          mixBlendMode: "difference",
        }}
      />

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: hovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", mass: 0.2, damping: 12 }}
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "white",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}