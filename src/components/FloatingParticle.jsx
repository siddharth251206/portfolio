import { motion } from "framer-motion";

export default function FloatingParticle({ size = 4, color, top, left }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top,
        left
      }}
      animate={{
        y: ["0px", "-25px", "0px"],
        x: ["0px", "15px", "0px"],
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
        delay: Math.random() * 2,
      }}
    />
  );
}
