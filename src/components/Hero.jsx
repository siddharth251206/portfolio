import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [charCount, setCharCount] = useState(0);

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
    const t1 = setTimeout(() => setShowHello(false), 1900);
    const t2 = setTimeout(() => setShiftImage(true), 2400);
    const t3 = setTimeout(() => setShowText(true), 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Typing effect
  const HELLO_TEXT = "<Hello, World />";
  useEffect(() => {
    if (!showHello) return;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCharCount(c => {
          if (c >= HELLO_TEXT.length) { clearInterval(interval); return c; }
          return c + 1;
        });
      }, 60);
      return () => clearInterval(interval);
    }, 350);
    return () => clearTimeout(timer);
  }, [showHello]);

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
          ? 'top-[12vh] left-1/2 -translate-x-1/2 text-center' 
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
            flex gap-3 sm:gap-4 pt-4 relative z-30
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
            ${isMobile ? 'h-[38vh] w-auto sm:h-[48vh]' : 'h-[85vh] w-auto lg:h-[80vh]'}
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

      {/* ── INTRO ANIMATION ── */}
      <AnimatePresence>
        {showHello && (
          <motion.div
            key="intro"
            className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--background)]"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Floating code snippets in background */}
            {["const", "{ }", "=>", "()", "//", "<>", "[]", "&&", "fn", "::"].map((snippet, i) => (
              <motion.span
                key={i}
                className="absolute font-mono text-[hsl(var(--accent))] select-none pointer-events-none"
                style={{
                  fontSize: `${10 + Math.random() * 14}px`,
                  left: `${8 + (i * 9)}%`,
                  top: `${15 + (i % 3) * 28}%`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 0.12, 0.08], y: [20, -10, -20] }}
                transition={{ duration: 2.5, delay: 0.1 + i * 0.08, ease: "easeOut" }}
              >
                {snippet}
              </motion.span>
            ))}

            {/* Main terminal card */}
            <motion.div
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow behind card */}
              <motion.div
                className="absolute -inset-8 rounded-3xl"
                style={{ background: "radial-gradient(ellipse, hsl(var(--accent) / 0.12) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Terminal frame */}
              <div
                className="relative border-[2.5px] border-[var(--foreground)] dark:border-white/25 bg-[var(--card-bg)] backdrop-blur-xl px-6 sm:px-10 py-6 sm:py-8 shadow-[6px_6px_0px_0px_var(--foreground)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.12)]"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                {/* Masking tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/50 dark:bg-white/10 border border-black/10 dark:border-white/10 rotate-[-2deg] shadow-sm" style={{ borderRadius: "4px 8px 3px 6px" }} />

                {/* Terminal dots */}
                <div className="flex gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  <span className="ml-3 text-[11px] font-mono text-[hsl(var(--muted-foreground))] opacity-60">~/portfolio</span>
                </div>

                {/* Prompt line */}
                <div className="flex items-center gap-2 mb-2">
                  <motion.span
                    className="font-mono text-sm text-[hsl(var(--accent))] opacity-70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.2 }}
                  >
                    $
                  </motion.span>
                  <motion.span
                    className="font-mono text-sm text-[hsl(var(--muted-foreground))] opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.25 }}
                  >
                    echo
                  </motion.span>
                </div>

                {/* The main typed text */}
                <div className="min-h-[1.2em]">
                  <span
                    className="hero-hand-title font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent) / 0.5))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {HELLO_TEXT.slice(0, charCount)}
                  </span>
                  {/* Inline blinking cursor */}
                  <span
                    className="inline-block w-[5px] h-[36px] sm:h-[52px] md:h-[64px] lg:h-[76px] translate-y-[6px] sm:translate-y-[10px] md:translate-y-[14px] lg:translate-y-[18px] rounded-sm ml-1"
                    style={{
                      background: "hsl(var(--accent))",
                      animation: "cursorBlink 0.7s steps(1) infinite",
                    }}
                  />
                </div>

                {/* Status line */}
                <motion.p
                  className="font-mono text-[11px] sm:text-xs text-[hsl(var(--muted-foreground))] mt-4 opacity-0"
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.15, duration: 0.3 }}
                >
                  ✓ ready to explore
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
    
  );
}