import { motion } from "framer-motion";
import FloatingParticle from "../components/FloatingParticle";
import { sectionReveal, staggerChildren, itemReveal } from "../animations/reveal";

export default function Skills() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      id="skills"
      className="relative py-32 px-6 md:px-12 text-[hsl(var(--foreground))] overflow-hidden"
    >

      {/* BACKGROUND SHAPES */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute w-[100vw] h-[50vw] rounded-full 
          bg-[#003459]/25 blur-[120px] 
          top-[-5vh] left-[5vw]"
        ></div>

        <div className="absolute w-[30vw] h-[30vw] rounded-full 
          bg-[#00A8E8]/20 blur-[100px]
          top-[25vh] right-[2vw]"
        ></div>
      </div>

      {/* FLOATING PARTICLES */}
      <FloatingParticle size={50} color="rgba(0,126,167,0.6)" top="22vh" left="18vw" />
      <FloatingParticle size={26} color="rgba(0,168,232,0.6)" top="36vh" left="32vw" />
      <FloatingParticle size={12} color="rgba(0,52,89,0.6)" top="60vh" left="10vw" />
      <FloatingParticle size={20} color="rgba(0,126,167,0.5)" top="28vh" left="60vw" />
      <FloatingParticle size={16} color="rgba(0,168,232,0.55)" top="48vh" left="60vw" />
      <FloatingParticle size={12} color="rgba(0,52,89,0.50)" top="85vh" left="52vw" />
      <FloatingParticle size={16} color="rgba(0,168,232,0.50)" top="35vh" left="85vw" />

      {/* BACKGROUND SUBTLE ACCENTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-72 h-72 bg-[hsl(var(--accent))/0.25] rounded-full blur-[120px] top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-[150px] bottom-20 right-10"></div>
      </div>

      {/* HEADING */}
      <motion.h2 
        variants={itemReveal}
        className="relative text-5xl md:text-6xl font-extrabold text-center mb-20"
      >
        Skills
        <span className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-24 h-[3px] bg-[hsl(var(--accent))] rounded-full"></span>
      </motion.h2>

      {/* SKILL CARDS (Staggered Reveal) */}
      <motion.div 
        variants={staggerChildren}
        className="
          relative z-10
          grid grid-cols-1 md:grid-cols-3 gap-10
          max-w-6xl mx-auto
        "
      >

        {/* FRONTEND */}
        <motion.div 
          variants={itemReveal}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="
            group p-10 rounded-3xl
            backdrop-blur-xl
            bg-white/40 dark:bg-white/10
            border border-white/30 dark:border-white/10
            shadow-xl shadow-black/20
            relative overflow-hidden
          "
        >
          <div className="absolute -top-5 -right-5 text-[4rem] opacity-10 group-hover:opacity-20 transition-all">⚛️</div>
          <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--accent))]">Frontend</h3>

          <motion.ul 
            variants={staggerChildren}
            className="space-y-3 text-lg leading-relaxed"
          >
            {["React.js", "Next.js / Vite", "TailwindCSS", "JavaScript / TypeScript", "CSS Animations"]
              .map((skill, i) => (
                <motion.li key={i} variants={itemReveal}>{skill}</motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* BACKEND */}
        <motion.div 
          variants={itemReveal}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="
            group p-10 rounded-3xl
            backdrop-blur-xl
            bg-white/40 dark:bg-white/10
            border border-white/30 dark:border-white/10
            shadow-xl shadow-black/20
            relative overflow-hidden
          "
        >
          <div className="absolute -top-5 -right-5 text-[4rem] opacity-10 group-hover:opacity-20 transition-all">🛠️</div>
          <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--accent))]">Backend</h3>

          <motion.ul 
            variants={staggerChildren}
            className="space-y-3 text-lg leading-relaxed"
          >
            {["Node.js", "Express", "MongoDB", "SQL / PostgreSQL", "REST APIs"]
              .map((skill, i) => (
                <motion.li key={i} variants={itemReveal}>{skill}</motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* OTHER */}
        <motion.div 
          variants={itemReveal}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="
            group p-10 rounded-3xl
            backdrop-blur-xl
            bg-white/40 dark:bg-white/10
            border border-white/30 dark:border-white/10
            shadow-xl shadow-black/20
            relative overflow-hidden
          "
        >
          <div className="absolute -top-5 -right-5 text-[4rem] opacity-10 group-hover:opacity-20 transition-all">🚀</div>
          <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--accent))]">Other</h3>

          <motion.ul 
            variants={staggerChildren}
            className="space-y-3 text-lg leading-relaxed"
          >
            {["Git / GitHub", "Figma", "Linux", "Firebase", "Problem Solving"]
              .map((skill, i) => (
                <motion.li key={i} variants={itemReveal}>{skill}</motion.li>
            ))}
          </motion.ul>
        </motion.div>

      </motion.div>

    </motion.section>
  );
}
