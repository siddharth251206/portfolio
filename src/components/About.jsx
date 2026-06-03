import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sectionReveal, staggerChildren, itemReveal } from "../animations/reveal";
import { usePortfolio } from "../context/PortfolioContext";
import { FolderGit2, Trophy, Cpu, Palette, ArrowUpRight, FileText } from "lucide-react";

const TABS = [
  { id: "story", label: "My Story" },
  { id: "achievements", label: "Achievements" },
];

const STAT_CARDS = [
  { icon: FolderGit2, value: "10+", label: "Projects Built", color: "hsl(var(--accent))" },
  { icon: Trophy, value: "5+", label: "Hackathons", color: "#f59e0b" },
  { icon: Cpu, value: "Full-Stack", label: "Developer", color: "#6366f1" },
  { icon: Palette, value: "UI/UX", label: "Enthusiast", color: "#ec4899" },
];

// Badge config: color + emoji for each label type
const BADGE_CONFIG = {
  "Winner":             { bg: "#059669", emoji: "🏆", shadow: "#047857" },
  "Finalist":           { bg: "#2563eb", emoji: "🎯", shadow: "#1d4ed8" },
  "Runner-Up / Finalist": { bg: "#d97706", emoji: "🥈", shadow: "#b45309" },
  "Selected":           { bg: "#0d9488", emoji: "✅", shadow: "#0f766e" },
  "Top 30":             { bg: "#7c3aed", emoji: "⚡", shadow: "#6d28d9" },
};

// Wobbly border-radius presets for the hand-drawn cards
const WOBBLY_CARD = [
  "255px 15px 225px 15px / 15px 225px 15px 255px",
  "15px 225px 15px 255px / 255px 15px 225px 15px",
  "225px 15px 255px 15px / 15px 255px 15px 225px",
  "15px 255px 15px 225px / 225px 15px 255px 15px",
  "200px 20px 200px 20px / 20px 200px 20px 200px",
  "20px 240px 20px 240px / 240px 20px 240px 20px",
  "230px 18px 210px 18px / 18px 230px 18px 210px",
];

// Slight rotations for each card
const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 0.8, -2.2];

// Tape/tack decoration types
const DECORATIONS = ["tape", "tack", "tape", "tack", "tape", "tack", "tape"];

function getBadge(label) {
  return BADGE_CONFIG[label] || { bg: "#0ea5e9", emoji: "🔹", shadow: "#0284c7" };
}

export default function About() {
  const { portfolioData } = usePortfolio();
  const { about } = portfolioData;
  const [activeTab, setActiveTab] = useState("story");
  const tabRefs = useRef({});
  const switcherRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    const parent = switcherRef.current;
    if (el && parent) {
      const parentRect = parent.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({ left: elRect.left - parentRect.left, width: elRect.width });
    }
  }, [activeTab]);

  const getMonthName = (monthNum) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const m = parseInt(monthNum);
    return (m >= 1 && m <= 12) ? months[m - 1] : "";
  };

  const sortedAchievements = [...about.achievements]
    .filter(a => typeof a === "object")
    .sort((a, b) => {
      const yearDiff = (parseInt(b.date) || 0) - (parseInt(a.date) || 0);
      if (yearDiff !== 0) return yearDiff;
      return (parseInt(b.month) || 0) - (parseInt(a.month) || 0);
    });

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      id="about"
      className="relative w-full py-16 sm:py-24 lg:py-32 text-[hsl(var(--foreground))]"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: "var(--about-bg)" }} />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-16 sm:w-24 h-16 sm:h-24 bg-[hsl(var(--accent))/0.3] blur-3xl rounded-full top-10 sm:top-20 left-5 sm:left-10 animate-pulse" />
        <div className="absolute w-20 sm:w-32 h-20 sm:h-32 bg-blue-500/20 blur-3xl rounded-full bottom-10 sm:bottom-20 right-10 sm:right-20 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* HEADING */}
        <motion.h2 variants={itemReveal}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-12 sm:mb-16 text-center hero-hand-title">
          About <span className="text-[hsl(var(--accent))]">Me</span>
        </motion.h2>

        {/* GLASS CARD */}
        <motion.div variants={staggerChildren}
          className="relative p-6 sm:p-10 lg:p-14 rounded-3xl backdrop-blur-2xl
            bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10
            shadow-2xl shadow-black/40">

          {/* FLOATING TAGS */}
          {about.tags.map((tag, i) => {
            const positions = [
              "hidden sm:block absolute -top-4 sm:-top-6 left-4 sm:left-6",
              "hidden md:block absolute top-8 sm:top-12 -right-4 sm:-right-6",
              "hidden lg:block absolute bottom-10 -left-26",
              "hidden sm:block absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2",
              "hidden lg:block absolute top-1/3 -left-26",
              "hidden lg:block absolute bottom-1/4 -right-26"
            ];
            const animations = ["animate-bounce","animate-floating","animate-floating-delayed",
              "animate-floating","animate-floating-delayed","animate-floating-slower"];
            return (
              <motion.div key={i} variants={itemReveal} className={positions[i % positions.length]}>
                <div className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-xl text-xs sm:text-sm font-semibold ${animations[i % animations.length]}`}>
                  {tag}
                </div>
              </motion.div>
            );
          })}

          {/* TAB SWITCHER */}
          <motion.div variants={itemReveal}>
            <div className="about-tab-switcher" ref={switcherRef}>
              <div className="about-tab-indicator"
                style={{ left: indicator.left, width: indicator.width }} />
              {TABS.map((tab) => (
                <button key={tab.id}
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  className={`about-tab-btn hero-hand-desc font-bold text-xl ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}>
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* TAB CONTENT */}
          <div className="about-tab-content">
            <AnimatePresence mode="wait">

              {/* ─── MY STORY ─── */}
              {activeTab === "story" && (
                <motion.div key="story"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                  
                  {/* STAT CARDS */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
                    {STAT_CARDS.map((stat, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="about-stat-card group">
                        <div className="about-stat-icon" style={{ color: stat.color }}>
                          <stat.icon size={20} strokeWidth={2} />
                        </div>
                        <div className="about-stat-value hero-hand-title text-2xl">{stat.value}</div>
                        <div className="about-stat-label hero-hand-desc font-bold text-[1.05rem]">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* BIO */}
                  <div className="space-y-5 sm:space-y-6">
                    {about.paragraphs.map((para, i) => (
                      <motion.p key={i}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                        className={i === 0
                          ? 'hero-hand-desc text-lg sm:text-xl lg:text-2xl font-bold text-[hsl(var(--foreground))] border-l-4 border-[hsl(var(--accent))] pl-4 sm:pl-5 leading-relaxed'
                          : 'hero-hand-desc text-base sm:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed'
                        }>
                        {para}
                      </motion.p>
                    ))}
                  </div>

                  {/* BUTTONS */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8 sm:pt-10">
                    <button className="hero-hand-btn"
                      onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                      <span>View Projects</span><ArrowUpRight size={16} />
                    </button>
                    <a href="/Siddharth_Sheth_resume.pdf" target="_blank" rel="noopener noreferrer"
                      className="hero-hand-btn hero-hand-btn--ghost">
                      <FileText size={16} /><span>Resume</span>
                    </a>
                  </motion.div>
                </motion.div>
              )}

              {/* ─── ACHIEVEMENTS ─── */}
              {activeTab === "achievements" && (
                <motion.div key="achievements"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                  
                  {/* Hand-drawn sticky-note achievement cards */}
                  <div className="ach-cards-grid">
                    {sortedAchievements.map((ach, i) => {
                      const badge = getBadge(ach.label);
                      const monthName = getMonthName(ach.month);
                      const wobbly = WOBBLY_CARD[i % WOBBLY_CARD.length];
                      const rotation = ROTATIONS[i % ROTATIONS.length];
                      const decoration = DECORATIONS[i % DECORATIONS.length];

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 24, rotate: 0 }}
                          animate={{ opacity: 1, y: 0, rotate: rotation }}
                          transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                          whileHover={{ 
                            scale: 1.05, 
                            rotate: 0, 
                            y: -8,
                            transition: { type: "spring", stiffness: 350, damping: 15 }
                          }}
                          className="ach-card"
                          style={{ 
                            borderRadius: wobbly,
                            "--ach-shadow": badge.shadow,
                          }}
                        >
                          {/* Tape or tack decoration */}
                          {decoration === "tape" && (
                            <div className="ach-tape" />
                          )}
                          {decoration === "tack" && (
                            <div className="ach-tack" style={{ background: badge.bg }} />
                          )}

                          {/* Emoji badge */}
                          <div className="ach-emoji">{badge.emoji}</div>

                          {/* Label pill */}
                          <div className="ach-label-pill"
                            style={{ 
                              background: badge.bg, 
                              color: "#fff",
                              boxShadow: `3px 3px 0px 0px ${badge.shadow}`,
                              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                            }}>
                            {ach.label}
                          </div>

                          {/* Title */}
                          <h4 className="ach-title">{ach.title}</h4>

                          {/* Date */}
                          <div className="ach-date">
                            {monthName && `${monthName} `}{ach.date}
                          </div>

                          {/* Description */}
                          {ach.description && (
                            <p className="ach-desc">{ach.description}</p>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}