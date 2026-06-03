import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sectionReveal, itemReveal } from "../animations/reveal";
import * as Icons from "lucide-react";
import SectionParticles from "./SectionParticles";
import { usePortfolio } from "../context/PortfolioContext";

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

// Every skill → icon URL or lucide fallback
const SKILL_ICONS = {
  "React.js":            `${DEVICON_BASE}/react/react-original.svg`,
  "Vite":                `${DEVICON_BASE}/vitejs/vitejs-original.svg`,
  "TailwindCSS":         `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  "Node.js":             `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  "Express":             `${DEVICON_BASE}/express/express-original.svg`,
  "Django":              `${DEVICON_BASE}/django/django-plain.svg`,
  "SQL / PostgreSQL":    `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  "REST APIs":           { lucide: "Globe" },
  "C":                   `${DEVICON_BASE}/c/c-original.svg`,
  "C++":                 `${DEVICON_BASE}/cplusplus/cplusplus-original.svg`,
  "JavaScript":          `${DEVICON_BASE}/javascript/javascript-original.svg`,
  "Python":              `${DEVICON_BASE}/python/python-original.svg`,
  "Data Structures":     { lucide: "Layers" },
  "Algorithms":          { lucide: "Binary" },
  "Dynamic Programming": { lucide: "Cpu" },
  "Graphs & Trees":      { lucide: "Network" },
  "Competitive Programming": { lucide: "Trophy" },
  "Git / GitHub":        `${DEVICON_BASE}/git/git-original.svg`,
  "Figma":               `${DEVICON_BASE}/figma/figma-original.svg`,
  "VS Code":             `${DEVICON_BASE}/vscode/vscode-original.svg`,
  "Render / Vercel":     `${DEVICON_BASE}/vercel/vercel-original.svg`,
  "Supabase":            `${DEVICON_BASE}/supabase/supabase-original.svg`,
  "NeonDB":              { lucide: "Database" },
};

// Wobbly border-radius presets
const WOBBLY = [
  "255px 15px 225px 15px / 15px 225px 15px 255px",
  "15px 225px 15px 255px / 255px 15px 225px 15px",
  "225px 15px 255px 15px / 15px 255px 15px 225px",
  "15px 255px 15px 225px / 225px 15px 255px 15px",
];

function SkillCard({ skill, index }) {
  const iconData = SKILL_ICONS[skill];
  const wobbly = WOBBLY[index % WOBBLY.length];
  // Slight varied rotation per card
  const rotations = [-1.5, 0.8, -0.5, 1.2, -1, 0.5, 1.5, -0.8];
  const rot = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: rot }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.08, 
        rotate: 0, 
        y: -6,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      className="skill-card-hand"
      style={{ borderRadius: wobbly }}
    >
      {/* Icon */}
      <div className="skill-card-icon">
        {typeof iconData === "string" ? (
          <img src={iconData} alt={skill} loading="lazy" />
        ) : iconData?.lucide ? (
          (() => {
            const LucideIcon = Icons[iconData.lucide] || Icons.Circle;
            return <LucideIcon size={38} strokeWidth={1.8} />;
          })()
        ) : (
          <Icons.Circle size={38} />
        )}
      </div>
      {/* Name */}
      <span className="skill-card-name">{skill}</span>
    </motion.div>
  );
}

export default function Skills() {
  const { portfolioData } = usePortfolio();
  const { skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      id="skills"
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      <SectionParticles count={12} />

      {/* HEADING — hand-drawn font */}
      <motion.h2 
        variants={itemReveal}
        className="skills-heading"
      >
        Skills
        <span className="skills-heading-underline" />
      </motion.h2>

      {/* CATEGORY TABS */}
      <motion.div variants={itemReveal} className="skills-tab-row">
        {skills.map((cat, i) => {
          const IconComponent = Icons[cat.iconName] || Icons.Circle;
          return (
            <button
              key={i}
              className={`skills-tab ${activeCategory === i ? "skills-tab--active" : ""}`}
              onClick={() => setActiveCategory(i)}
              style={{ 
                borderRadius: WOBBLY[i % WOBBLY.length],
              }}
            >
              <IconComponent size={16} strokeWidth={2.5} />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </motion.div>

      {/* SKILL CARDS GRID */}
      <div className="skills-grid-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="skills-grid"
          >
            {skills[activeCategory]?.items.map((skill, idx) => (
              <SkillCard key={skill} skill={skill} index={idx} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </motion.section>
  );
}