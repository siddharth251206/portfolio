import { motion } from "framer-motion";

export default function FloatingParticle({
  size = 20,
  color = "rgba(255,255,255,0.3)",
  top,
  left,
  shape = "circle", // circle | diamond | triangle | square | blob
}) {
  
  // SHAPE STYLES
  const shapeStyles = {
    circle: { borderRadius: "50%" },

    diamond: {
      width: size,
      height: size,
      backgroundColor: color,
      transform: "rotate(45deg)",
      borderRadius: "6px",
    },

    triangle: {
      width: 0,
      height: 0,
      borderLeft: `${size}px solid transparent`,
      borderRight: `${size}px solid transparent`,
      borderBottom: `${size * 1.6}px solid ${color}`,
      backgroundColor: "transparent",
    },

    square: {
      borderRadius: "8px",
    },

    blob: {
      borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%",
    },
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        top,
        left,
        width: shape === "triangle" ? 0 : size,
        height: shape === "triangle" ? 0 : size,
        backgroundColor: shape === "triangle" ? "transparent" : color,
        ...shapeStyles[shape],
      }}
      animate={{
        y: ["0px", "-20px", "0px"],
        x: ["0px", "15px", "0px"],
        rotate: shape === "diamond" || shape === "blob" ? [0, 15, -10, 0] : 0,
      }}
      transition={{
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    />
  );
}
