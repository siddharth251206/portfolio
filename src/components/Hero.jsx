import { useEffect, useState } from "react";
import { motion} from "framer-motion";
import  FloatingParticle  from "../components/FloatingParticle"
import SectionParticles from "./SectionParticles";
export default function Hero() {
  const [showHello, setShowHello] = useState(true);
  const [shiftImage, setShiftImage] = useState(false);
  const [showText, setShowText] = useState(false);
 const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,   // timing between each word
      delayChildren: 0.1
    }
  }
};

const drop = {
  hidden: {
    opacity: 0,
    y: -30,        // start above
  },
  show: {
    opacity: 1,
    y: 0,          // end at normal position
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    }
  }
};
const imageVariants = {
  initial: {
    opacity: 0,
    y: 40,
    x: 0,
    scale: 1
  },
  enter: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  shifted: {
    x: 240,
    scale: 0.98,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};


  // Animation sequence
  useEffect(() => {
    const t1 = setTimeout(() => setShowHello(false), 1500); // hello passes
    const t2 = setTimeout(() => setShiftImage(true), 1600); // start shrinking + shifting
    const t3 = setTimeout(() => setShowText(true), 1900);  // word drop intro

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);
console.log("shiftImage:", shiftImage);

  return (
    <section className="relative h-screen w-full
    text-[hsl(var(--foreground))]
    overflow-hidden">
      

<SectionParticles count={12} />


      {/* BACKGROUND SHAPES, NOISE, GLOW CAN BE ADDED HERE */}

{/* LEFT TEXT AREA */}
<div className="absolute left-[18vw] top-[30vh] z-10 max-w-[650px]">
  {showText && (
  <motion.div
    className="space-y-4 text-left"
    variants={container}
    initial="hidden"
    animate="show"
  >
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">

      {/* LINE 1 */}
      {/* LINE 1 */}
<motion.span className="inline-block">
  {"Hi, I'm Siddharth Sheth".split(" ").map((word, i) => (
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
        {"a CSE undergrad from SVNIT.".split(" ").map((word, i) => (
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
      className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed max-w-md"
      variants={drop}
    >
      Your small description text will go here. This is placeholder text.
    </motion.p>

    {/* BUTTONS */}
    <motion.div className="flex gap-4 pt-4">
      <motion.button className="btn hover-target" variants={drop}>
        View Projects
      </motion.button>
      <motion.button className="btn hover-target" variants={drop}>
        Contact Me
      </motion.button>
    </motion.div>

  </motion.div>
)}


</div>

{/* HERO IMAGE WRAPPER */}
<div
  className="
    absolute bottom-0 left-1/2 
    -translate-x-1/2 
    z-20 pointer-events-none select-none
  "
>
  {/* Glow */}
  <div className="absolute inset-0 rounded-[999px] glow-border"></div>

  <motion.img
    src="/sid.png"
    alt="Siddharth"
    className="relative z-10 shape-glow shape-glow-animate h-[90vh]"
    style={{
  transformOrigin: "bottom center"
}}

    initial={{ opacity: 1, y: 40, scale: 1, x: 0 }}
    animate={
      shiftImage
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
