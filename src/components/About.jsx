import { motion } from "framer-motion";
import { sectionReveal, staggerChildren, itemReveal } from "../animations/reveal";
import { usePortfolio } from "../context/PortfolioContext";

export default function About() {
  const { portfolioData } = usePortfolio();
  const { about } = portfolioData;
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

          {/* FLOATING TAGS - Dynamic */}
          {about.tags.map((tag, i) => {
            const positions = [
              "hidden sm:block absolute -top-4 sm:-top-6 left-4 sm:left-6",
              "hidden md:block absolute top-8 sm:top-12 -right-4 sm:-right-6",
              "hidden lg:block absolute bottom-10 -left-26",
              "hidden sm:block absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2",
              "hidden lg:block absolute top-1/3 -left-26",
              "hidden lg:block absolute bottom-1/4 -right-26"
            ];
            const animations = [
              "animate-bounce",
              "animate-floating",
              "animate-floating-delayed",
              "animate-floating",
              "animate-floating-delayed",
              "animate-floating-slower"
            ];
            
            // fallback if more tags than positions defined
            const pos = positions[i % positions.length];
            const anim = animations[i % animations.length];

            return (
              <motion.div key={i} variants={itemReveal} className={pos}>
                <div className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-xl text-xs sm:text-sm font-semibold ${anim}`}>
                  {tag}
                </div>
              </motion.div>
            );
          })}

          {/* BIO TEXT */}
          <motion.div 
            variants={staggerChildren} 
            className="leading-relaxed text-base sm:text-lg lg:text-xl space-y-4 sm:space-y-6"
          >
            {about.paragraphs.map((para, i) => (
              <motion.p key={i} variants={itemReveal}>
                {para}
              </motion.p>
            ))}
          </motion.div>

         {/* ACHIEVEMENTS BLOCK — resume-style timeline */}
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
    className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-[hsl(var(--accent))]"
  >
    Achievements
  </motion.h3>

  <div className="relative">
    {/* Vertical timeline line */}
    <div className="absolute left-[22px] top-2 bottom-2 w-[2px] bg-[hsl(var(--accent))/0.2] rounded-full hidden sm:block" />

    <div className="space-y-8">
      {[...about.achievements]
        .sort((a, b) => {
          if (typeof a !== 'object' || typeof b !== 'object') return 0;
          const yearA = parseInt(a.date) || 0;
          const yearB = parseInt(b.date) || 0;
          if (yearA !== yearB) return yearB - yearA;
          const monthA = parseInt(a.month) || 0;
          const monthB = parseInt(b.month) || 0;
          return monthB - monthA;
        })
        .map((ach, i) => {
          const isObj = typeof ach === 'object';
          
          const getMonthName = (monthNum) => {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const m = parseInt(monthNum);
            if (m >= 1 && m <= 12) return months[m - 1];
            return "";
          };
          
          const monthName = isObj ? getMonthName(ach.month) : "";
          const displayDate = isObj ? `${monthName ? monthName + ' ' : ''}${ach.date}` : '—';
          // Short date for the circular badge
          const badgeDate = isObj ? ach.date : '—';
          
          return (
            <motion.div key={i} variants={itemReveal} className="flex gap-4 sm:gap-6 items-start">
              {/* Timeline dot */}
              <div className="relative flex-shrink-0 hidden sm:flex flex-col items-center mt-1">
                <div className="w-[46px] h-[46px] rounded-full bg-[hsl(var(--accent))/0.15] border-2 border-[hsl(var(--accent))/0.4] flex items-center justify-center z-10 flex-col">
                  {monthName && <span className="text-[8px] font-bold text-[hsl(var(--accent))] uppercase tracking-widest leading-none mb-0.5">{monthName}</span>}
                  <span className="text-[10px] font-black text-[hsl(var(--accent))] tracking-wider leading-none">
                    {badgeDate}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                {isObj ? (
                  <>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
                        {ach.label}
                      </span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium sm:hidden">{displayDate}</span>
                    </div>
                    <p className="font-bold text-base sm:text-lg text-[hsl(var(--foreground))] leading-snug mb-1">
                      {ach.title}
                    </p>
                    {ach.description && (
                      <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                        {ach.description}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-base sm:text-lg leading-relaxed text-[hsl(var(--foreground))]">• {ach}</p>
                )}
              </div>
            </motion.div>
          );
      })}
    </div>
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
              href="/Siddharth_Sheth_resume.pdf"
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