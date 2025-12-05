import { motion } from "framer-motion";
import { sectionReveal, staggerChildren, itemReveal } from "../animations/reveal";

export default function About() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full py-32 text-[hsl(var(--foreground))]"

    >

      {/* BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: "var(--about-bg)" }}
      ></div>

      {/* FLOATING DECOR SHAPES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-24 h-24 bg-[hsl(var(--accent))/0.3] blur-3xl rounded-full top-20 left-10 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-blue-500/20 blur-3xl rounded-full bottom-20 right-20 animate-pulse"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* HEADING */}
        <motion.h2 
          variants={itemReveal}
          className="text-5xl md:text-6xl font-extrabold mb-16 text-center"
        >
          About <span className="text-[hsl(var(--accent))]">Me</span>
        </motion.h2>

        {/* GLASS CARD */}
        <motion.div 
          variants={staggerChildren}
          className="
            relative p-10 md:p-14
            rounded-3xl
            backdrop-blur-2xl
            bg-white/10 dark:bg-white/5
            border border-white/20 dark:border-white/10
            shadow-2xl shadow-black/40
            transform transition-all hover:scale-[1.02]
          "
        >

          {/* FLOATING TAGS */}
          <motion.div variants={itemReveal} className="absolute -top-6 left-6">
            <div className="px-5 py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-sm font-semibold animate-bounce">
              CSE @ SVNIT
            </div>
          </motion.div>

          <motion.div variants={itemReveal} className="absolute top-12 -right-6">
            <div className="px-5 py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-sm font-semibold animate-floating">
              Developer
            </div>
          </motion.div>

          <motion.div variants={itemReveal} className="absolute bottom-10 -left-26">
            <div className="px-5 py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-sm font-semibold animate-floating-delayed">
              UI/UX Designer
            </div>
          </motion.div>

          <motion.div variants={itemReveal} className="absolute -bottom-4 right-1/2 translate-x-1/2">
            <div className="px-5 py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-sm font-semibold animate-floating">
              Passionate
            </div>
          </motion.div>

          <motion.div variants={itemReveal} className="absolute top-1/3 -left-26">
            <div className="px-5 py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-sm font-semibold animate-floating-delayed">
              Learner
            </div>
          </motion.div>

          <motion.div variants={itemReveal} className="absolute bottom-1/4 -right-26">
            <div className="px-5 py-2 rounded-full bg-white/20 
              border border-white/30 backdrop-blur-xl 
              text-sm font-semibold animate-floating-slower">
              Competitive Programmer
            </div>
          </motion.div>

          {/* BIO TEXT */}
          <motion.div variants={staggerChildren} className="leading-relaxed text-xl space-y-6">

            <motion.p variants={itemReveal}>
              I’m Siddharth — a Computer Science undergrad at SVNIT, 
              driven by design, creativity and the thrill of making ideas real.
            </motion.p>

            <motion.p variants={itemReveal}>
              I love blending clean UI, smooth motion, and solid engineering 
              to craft digital experiences that feel effortless. 
              Whether I’m polishing a frontend interaction or optimizing backend logic, 
              I want everything I build to feel *intentional*.
            </motion.p>

            <motion.p variants={itemReveal}>
              Beyond code, I’m a learner at heart — constantly exploring,
              experimenting, and pushing myself to design things that 
              not only work well, but look damn good while doing it.
            </motion.p>

          </motion.div>

          {/* BUTTONS */}
          <motion.div variants={staggerChildren} className="flex gap-4 pt-10">
            <motion.button variants={itemReveal} className="btn">View Projects</motion.button>
            <motion.button variants={itemReveal} className="btn">Download Resume</motion.button>
          </motion.div>

        </motion.div>

      </div>

    </motion.section>
  );
}
