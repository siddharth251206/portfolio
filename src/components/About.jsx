import { motion } from "framer-motion";
import { sectionReveal, staggerChildren, itemReveal } from "../animations/reveal";

export default function About() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      id="about"
      className="relative w-full py-16 sm:py-24 lg:py-32 text-[hsl(var(--foreground))]"
    >

      {/* BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: "var(--about-bg)" }}
      ></div>

      {/* FLOATING DECOR SHAPES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-16 sm:w-24 h-16 sm:h-24 bg-[hsl(var(--accent))/0.3] blur-3xl rounded-full top-10 sm:top-20 left-5 sm:left-10 animate-pulse"></div>
        <div className="absolute w-20 sm:w-32 h-20 sm:h-32 bg-blue-500/20 blur-3xl rounded-full bottom-10 sm:bottom-20 right-10 sm:right-20 animate-pulse"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <motion.h2 
          variants={itemReveal}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-12 sm:mb-16 text-center"
        >
          About <span className="text-[hsl(var(--accent))]">Me</span>
        </motion.h2>

        {/* GLASS CARD */}
        <motion.div 
          variants={staggerChildren}
          className="
            relative p-6 sm:p-10 lg:p-14
            rounded-3xl
            backdrop-blur-2xl
            bg-white/10 dark:bg-white/5
            border border-white/20 dark:border-white/10
            shadow-2xl shadow-black/40
            transform transition-all hover:scale-[1.02]
          "
        >

          {/* FLOATING TAGS - Hidden on very small screens, adjusted positions */}
          <motion.div 
            variants={itemReveal} 
            className="hidden sm:block absolute -top-4 sm:-top-6 left-4 sm:left-6"
          >
            <div className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-xs sm:text-sm font-semibold animate-bounce">
              CSE @ SVNIT
            </div>
          </motion.div>

          <motion.div 
            variants={itemReveal} 
            className="hidden md:block absolute top-8 sm:top-12 -right-4 sm:-right-6"
          >
            <div className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-xs sm:text-sm font-semibold animate-floating">
              Developer
            </div>
          </motion.div>

          <motion.div 
            variants={itemReveal} 
            className="hidden lg:block absolute bottom-10 -left-26"
          >
            <div className="px-5 py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-sm font-semibold animate-floating-delayed">
              UI/UX Designer
            </div>
          </motion.div>

          <motion.div 
            variants={itemReveal} 
            className="hidden sm:block absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2"
          >
            <div className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-xs sm:text-sm font-semibold animate-floating">
              Passionate
            </div>
          </motion.div>

          <motion.div 
            variants={itemReveal} 
            className="hidden lg:block absolute top-1/3 -left-26"
          >
            <div className="px-5 py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-sm font-semibold animate-floating-delayed">
              Learner
            </div>
          </motion.div>

          <motion.div 
            variants={itemReveal} 
            className="hidden lg:block absolute bottom-1/4 -right-26"
          >
            <div className="px-5 py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-sm font-semibold animate-floating-slower">
              Competitive Programmer
            </div>
          </motion.div>

          {/* BIO TEXT */}
          <motion.div 
            variants={staggerChildren} 
            className="leading-relaxed text-base sm:text-lg lg:text-xl space-y-4 sm:space-y-6"
          >

            <motion.p variants={itemReveal}>
              I'm Siddharth — a Computer Science undergrad at SVNIT, 
              driven by design, creativity and the thrill of making ideas real.
            </motion.p>

            <motion.p variants={itemReveal}>
              I love blending clean UI, smooth motion, and solid engineering 
              to craft digital experiences that feel effortless. 
              Whether I'm polishing a frontend interaction or optimizing backend logic, 
              I want everything I build to feel *intentional*.
            </motion.p>

            <motion.p variants={itemReveal}>
              Beyond code, I'm a learner at heart — constantly exploring,
              experimenting, and pushing myself to design things that 
              not only work well, but look damn good while doing it.
            </motion.p>

          </motion.div>

         {/* ACHIEVEMENTS BLOCK */}
<motion.div 
  variants={staggerChildren}
  className="
    mt-10 sm:mt-12 p-6 sm:p-8 
    rounded-2xl bg-white/10 dark:bg-white/5 
    border border-white/20 dark:border-white/10
    backdrop-blur-2xl shadow-xl shadow-black/30
  "
>
  <motion.h3 
    variants={itemReveal}
    className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[hsl(var(--accent))]"
  >
    Achievements
  </motion.h3>

  <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed">

    <motion.p variants={itemReveal}>
      • Selected in the <span className="font-semibold">Internal Hackathon Round</span> of Smart India Hackathon 2025 (SIH).
    </motion.p>

    <motion.p variants={itemReveal}>
      • <span className="font-semibold">Finalist</span> — Web Wonders (Team Web Wonders).
    </motion.p>

    <motion.p variants={itemReveal}>
      • <span className="font-semibold">Top 30 Finalist</span> in the ACM Summer Coding Challenge, SVNIT.
    </motion.p>

  </div>
</motion.div>


          {/* BUTTONS */}
          <motion.div 
            variants={staggerChildren} 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8 sm:pt-10"
          >
            <motion.button 
              variants={itemReveal} 
              className="btn w-full sm:w-auto"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
            </motion.button>
            <motion.a
              variants={itemReveal}
              href="/Siddharth_Sheth.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full sm:w-auto text-center"
            >
              Resume
            </motion.a>
          </motion.div>

        </motion.div>

      </div>

    </motion.section>
  );
}