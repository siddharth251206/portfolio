import { useEffect, useState } from "react";
import { motion} from "framer-motion";
import  FloatingParticle  from "../components/FloatingParticle"
import SectionParticles from "./SectionParticles";
import { usePortfolio } from "../context/PortfolioContext";
import { Github, Linkedin, Instagram } from "lucide-react";

const LeetCodeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

const SOCIAL_LINKS = [
  { icon: <Github size={18} />, href: "https://github.com/siddharth251206", label: "GitHub" },
  { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/siddharth-sheth-007873319", label: "LinkedIn" },
  { icon: <LeetCodeIcon size={18} />, href: "https://leetcode.com/u/siddharth2512/", label: "LeetCode" },
  { icon: <Instagram size={18} />, href: "https://instagram.com/sidhu251206", label: "Instagram" },
];

export default function Hero() {
  const { portfolioData } = usePortfolio();
  const { hero } = portfolioData;
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
        absolute z-30 max-w-[650px] w-full px-4
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
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl hero-hand-title
          `}>

            {/* LINE 1 */}
            <motion.span className="inline-block">
              {hero.greeting.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={drop}
                  className={`inline-block mr-2 ${
                    word.includes("Siddharth") ? "text-[hsl(var(--accent))]" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
            <br />

            {/* LINE 2 */}
            <motion.span className="inline-block mt-2">
              {hero.headline.split(" ").map((word, i) => (
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
              hero-hand-desc leading-relaxed max-w-md
              text-base sm:text-lg
              ${isMobile ? 'mx-auto' : ''}
            `}
            variants={drop}
          >
            {hero.bio}
          </motion.p>


          {/* BUTTONS */}
          <motion.div className={`
            flex gap-3 sm:gap-4 pt-4
            ${isMobile ? 'justify-center flex-wrap' : ''}
          `}>
            <motion.button
  className="hero-hand-btn text-sm sm:text-base"
  variants={drop}
  data-cursor="pointer"
  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
>
  View Projects
</motion.button>

<motion.button
  className="hero-hand-btn hero-hand-btn--ghost text-sm sm:text-base"
  variants={drop}
  data-cursor="pointer"
  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
>
  Contact Me
</motion.button>

          </motion.div>

          {/* SOCIAL LINKS - DESKTOP */}
          {!isMobile && (
            <motion.div
              className="flex gap-3 pt-2 relative z-30"
              variants={drop}
            >
              {SOCIAL_LINKS.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hero-social-btn"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  data-cursor="pointer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          )}

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
          src="/siddharth.png"
          alt="Siddharth"
          className={`
            relative z-10 shape-glow shape-glow-animate object-contain
            ${isMobile ? 'h-[45vh] w-auto sm:h-[55vh]' : 'h-[85vh] w-auto lg:h-[80vh]'}
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

      {/* MOBILE SOCIAL LINKS - Positioned at bottom */}
      {isMobile && showText && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-40"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {SOCIAL_LINKS.map((social, i) => (
            <motion.a
              key={i}
              variants={drop}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="hero-social-btn bg-white/80 dark:bg-[#001B2E]/80 backdrop-blur-md"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      )}

      {/* HELLOOOOOO PASSING BEHIND */}
      {showHello && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <span className="hellosweep hero-hand-title">
            HEEEELLLLLLOOOOOOO
          </span>
        </div>
      )}

    </section>
    
  );
}