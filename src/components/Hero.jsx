import { useEffect, useState } from "react";
import { motion} from "framer-motion";
import  FloatingParticle  from "../components/FloatingParticle"
import SectionParticles from "./SectionParticles";

export default function Hero() {
  const [showHello, setShowHello] = useState(true);
  const [shiftImage, setShiftImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

 const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const drop = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    }
  }
};

  // Animation sequence
  useEffect(() => {
    const t1 = setTimeout(() => setShowHello(false), 2000);
    const t2 = setTimeout(() => setShiftImage(true), 1600);
    const t3 = setTimeout(() => setShowText(true), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full
    text-[hsl(var(--foreground))]
    overflow-hidden flex items-center justify-center
    px-4 sm:px-6 lg:px-8">
      
      <SectionParticles count={isMobile ? 6 : 12} />

      {/* LEFT TEXT AREA - Responsive positioning */}
      <div className={`
        absolute z-10 max-w-[650px] w-full px-4
        ${isMobile 
          ? 'top-[15vh] left-1/2 -translate-x-1/2 text-center' 
          : 'left-[8vw] lg:left-[18vw] top-[20vh] text-left'}
      `}>
        {showText && (
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <h1 className={`
            font-extrabold tracking-tight leading-[1.05]
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          `}>

            {/* LINE 1 */}
            <motion.span className="inline-block">
              {"Hi, I'm Siddharth Sheth,".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={drop}
                  className={`inline-block mr-2 ${
                    word === "Siddharth" ? "text-[hsl(var(--accent))]" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
            <br />

            {/* LINE 2 */}
            <motion.span className="inline-block mt-2">
              {"a CSE undergrad from SVNIT, learning, building, evolving.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={drop}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>

          </h1>

          {/* PARAGRAPH */}
          <motion.p
            className={`
              text-[hsl(var(--muted-foreground))] 
              leading-relaxed max-w-md
              text-base sm:text-lg
              ${isMobile ? 'mx-auto' : ''}
            `}
            variants={drop}
          >
            I enjoy taking ideas from sketches to screens.
Web dev, DSA, design systems, clean UX — all the stuff that makes a product feel alive.
          </motion.p>

          {/* BUTTONS */}
          <motion.div className={`
            flex gap-3 sm:gap-4 pt-4
            ${isMobile ? 'justify-center flex-wrap' : ''}
          `}>
            <motion.button
  className="btn hover-target text-sm sm:text-base"
  variants={drop}
  data-cursor="pointer"
  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
>
  View Projects
</motion.button>

<motion.button
  className="btn hover-target text-sm sm:text-base"
  variants={drop}
  data-cursor="pointer"
  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
>
  Contact Me
</motion.button>

          </motion.div>

        </motion.div>
      )}
      </div>

      {/* HERO IMAGE WRAPPER - Responsive */}
      <div className={`
        absolute pointer-events-none select-none
        ${isMobile 
          ? 'bottom-0 left-1/2 -translate-x-1/2' 
          : 'bottom-0 left-1/2 -translate-x-1/2'}
        z-20
      `}>
        {/* Glow */}
        <div className="absolute inset-0 rounded-[999px] glow-border"></div>

        <motion.img
          src="/sid.png"
          alt="Siddharth"
          className={`
            relative z-10 shape-glow shape-glow-animate object-contain
            ${isMobile ? 'h-[45vh] w-auto sm:h-[55vh]' : 'h-[75vh] w-auto lg:h-[85vh]'}
          `}
          style={{
            transformOrigin: "bottom center",
            maxWidth: isMobile ? "85vw" : "none"
          }}
          initial={{ opacity: 1, y: 40, scale: 1, x: 0 }}
          animate={
            shiftImage && !isMobile
              ? { opacity: 1, y: 0, scale: 0.98, x: 360 }
              : { opacity: 1, y: 0, scale: 1, x: 0 }
          }
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
        />
      </div>

      {/* HELLOOOOOO PASSING BEHIND */}
      {showHello && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <span className="hellosweep">
            HEEEELLLLLLOOOOOOO
          </span>
        </div>
      )}

    </section>
    
  );
}