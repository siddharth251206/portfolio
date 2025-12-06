import { motion } from "framer-motion";
import FloatingParticle from "../components/FloatingParticle";
import { sectionReveal, staggerChildren, itemReveal } from "../animations/reveal";
import { MonitorCog, Code2, Brain, Wrench } from "lucide-react";
import SectionParticles from "./SectionParticles";

export default function Skills() {
  const categories = [
    {
      title: "Web Development",
      icon: <MonitorCog size={70} strokeWidth={1.5} />,
      skills: [
        "React.js", "Next.js / Vite", "TailwindCSS",
        "Node.js", "Express", "MongoDB",
        "SQL / PostgreSQL", "REST APIs"
      ]
    },
    {
      title: "Programming Languages",
      icon: <Code2 size={70} strokeWidth={1.5} />,
      skills: [
        "C++", "JavaScript", "TypeScript",
        "Python (soon)", "Bash / Shell"
      ]
    },
    {
      title: "CS & Problem Solving",
      icon: <Brain size={70} strokeWidth={1.5} />,
      skills: [
        "Data Structures", "Algorithms",
        "Dynamic Programming", "Graphs & Trees",
        "Competitive Programming"
      ]
    },
    {
      title: "Tools & Platforms",
      icon: <Wrench size={70} strokeWidth={1.5} />,
      skills: [
        "Git / GitHub", "Linux", "Figma",
        "Firebase", "VS Code", "Render / Vercel"
      ]
    }
  ];

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      id="skills"
      className="relative py-32 px-6 md:px-12 text-[hsl(var(--foreground))] overflow-hidden"
    >

<SectionParticles count={12} />
      {/* SECTION HEADING */}
      <motion.h2 
        variants={itemReveal}
        className="relative text-5xl md:text-6xl font-extrabold text-center mb-20"
      >
        Skills
        <span className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-24 h-[3px] bg-[hsl(var(--accent))] rounded-full"></span>
      </motion.h2>

      {/* SKILL GRID */}
      <motion.div 
        variants={staggerChildren}
        className="
          relative z-10
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10
          max-w-7xl mx-auto
        "
      >
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            variants={itemReveal}
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="
  group p-8 rounded-3xl relative overflow-hidden

  /* ULTRA TRANSPARENT GLASS */
  backdrop-blur-[28px]
  bg-white/5 dark:bg-white/2

  /* CRISP GLASS BORDER */
  border border-white/30 dark:border-white/5

  /* SUBTLE GLASS SHEEN HIGHLIGHT */
  before:absolute before:inset-0 before:rounded-3xl
  before:bg-gradient-to-br before:from-white/25 before:to-transparent
  dark:before:from-white/5 dark:before:to-transparent
  before:pointer-events-none

  /* FLOATING SHADOW */
  shadow-[0_8px_25px_rgba(0,0,0,0.10)]
  hover:shadow-[0_12px_40px_rgba(0,0,0,0.20)]

  transition-all duration-500
"
          
          >
            {/* GRADIENT BORDER */}
            <div className="
              absolute inset-0 rounded-3xl 
              border border-transparent 
              group-hover:border-[hsl(var(--accent))]
              opacity-40 group-hover:opacity-80
              transition-all duration-500
              pointer-events-none
            "></div>

            {/* SHINE EFFECT */}
            <div className="
              absolute inset-0 
              bg-gradient-to-br from-white/20 to-transparent
              opacity-0 group-hover:opacity-20
              transition-opacity duration-500
              pointer-events-none
            "></div>

            {/* FLOATING ICON */}
            <div className="
              absolute -top-1 -right-0 
              opacity-10 group-hover:opacity-20 
              translate-y-2 group-hover:translate-y-0
              transition-all duration-500
            ">
              {cat.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--accent))]">
              {cat.title}
            </h3>

            {/* SKILL LIST */}
            <motion.ul
              variants={staggerChildren}
              className="space-y-3 text-lg leading-relaxed"
            >
              {cat.skills.map((skill, idx) => (
                <motion.li
                  key={idx}
                  variants={itemReveal}
                  className="
                    relative pl-3
                    before:content-['']
                    before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2
                    before:w-1.5 before:h-1.5 before:rounded-full
                    before:bg-[hsl(var(--accent))]
                    before:opacity-60
                    hover:before:opacity-100
                    transition-all
                  "
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>

    </motion.section>
  );
}
