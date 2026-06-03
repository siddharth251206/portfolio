import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Globe, ExternalLink } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ReactMarkdown from 'react-markdown';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

/* ── Joke data with richer metadata ── */
const JOKES = [
  // 1–2: Binary (standalone)
  { side: 'right', lines: ["There are 10", "types of people:"], sublines: ["those who know", "binary, and", "those who don't."], icon: "🔢" },
  // 3: Works on my machine (standalone)
  { side: 'left', lines: ["\"It works on", "my machine!\""], sublines: ["¯\\_(ツ)_/¯"], icon: "💻" },
  // 4: Undocumented feature (standalone)
  { side: 'right', lines: ["It's not a bug..."], sublines: ["It's an undocumented", "feature!"], icon: "🐛" },
  // 5–6: Milk joke (connected pair)
  { side: 'left', lines: ["Wife: \"Buy a gallon", "of milk. If they", "have eggs, buy", "a dozen.\""], connectNext: true, icon: "🛒" },
  { side: 'right', lines: ["*Husband returns", "with 12 gallons*"], punchline: true, icon: "🥛" },
  // 7: Dark mode (standalone)
  { side: 'left', lines: ["Why do devs", "love dark mode?"], sublines: ["Because light", "attracts bugs!"], icon: "🌙" },
  // 8: Algorithm (standalone, definition style)
  { side: 'right', lines: ["Algorithm (n):"], sublines: ["Word used by devs", "when they don't want", "to explain what", "they did."], icon: "📖" },
  // 9: Source code (standalone)
  { side: 'left', lines: ["I'd love to", "change the world,"], sublines: ["but they won't", "give me the", "source code."], icon: "🌍" },
  // 10–11: Hardware / Software (connected pair)
  { side: 'right', lines: ["Hardware:"], sublines: ["The part of a", "computer that", "you can kick."], connectNext: true, icon: "⌨️" },
  { side: 'left', lines: ["Software:"], sublines: ["The part that makes", "you WANT to kick it."], punchline: true, icon: "💾" },
  // 12–13: 99 bugs (connected pair)
  { side: 'right', lines: ["99 little bugs", "in the code..."], sublines: ["Take one down,", "patch it around..."], connectNext: true, icon: "🪲" },
  { side: 'left', lines: ["127 little bugs", "in the code."], punchline: true, icon: "😭" },
  // 14–15: SQL bar (connected pair)
  { side: 'right', lines: ["A SQL query goes", "into a bar, walks up", "to two tables", "and asks..."], connectNext: true, icon: "🍺" },
  { side: 'left', lines: ["\"Can I JOIN you?\""], punchline: true, icon: "🤝" },
  // 16: Light bulb (standalone)
  { side: 'right', lines: ["How many programmers", "to change a", "light bulb?"], sublines: ["None.", "That's a hardware", "problem."], icon: "💡" },
  // 17: Count from 0 (standalone, short)
  { side: 'left', lines: ["Real programmers", "count from 0."], icon: "0️⃣" },
  // 18–19: Hard problems (connected pair)
  { side: 'right', lines: ["There are only 2 hard", "problems in CS:"], connectNext: true, icon: "🧠" },
  { side: 'left', lines: ["1) Cache invalidation", "2) Naming things", "3) Off-by-one errors"], punchline: true, icon: "🤦" },
  // 20: Recursion (standalone)
  { side: 'right', lines: ["To understand", "recursion, you must", "first understand", "recursion."], icon: "🔄" },
  // 21–22: Byte bar (connected pair)
  { side: 'left', lines: ["A byte walks into", "a bar and orders", "a pint. Bartender:", "\"What's wrong?\""], connectNext: true, icon: "🍻" },
  { side: 'right', lines: ["\"Parity error.", "I'm feeling", "a bit off.\""], punchline: true, icon: "😵" },
  // 23: UDP (standalone)
  { side: 'left', lines: ["I have a joke", "about UDP..."], sublines: ["but you might", "not get it."], icon: "📡" },
  // 24: Programmer definition (standalone)
  { side: 'right', lines: ["Programmer (n):"], sublines: ["A machine that", "turns coffee", "into code."], icon: "☕" },
  // 25–26: Product manager (connected pair)
  { side: 'left', lines: ["A product manager", "walks into a bar..."], connectNext: true, icon: "📋" },
  { side: 'right', lines: ["Asks for a drink.", "Bartender says:", "\"It's on the", "roadmap.\""], punchline: true, icon: "🗺️" },
  // 27: Git pull (standalone)
  { side: 'left', lines: ["git pull?"], sublines: ["More like", "git pray. 🙏"], icon: "🔀" },
  // 28–29: Code works / doesn't (connected pair)
  { side: 'right', lines: ["My code doesn't", "work. I have", "no idea why."], connectNext: true, icon: "❌" },
  { side: 'left', lines: ["My code works.", "I have no", "idea why."], punchline: true, icon: "✅" },
  // 30: Race condition (standalone)
  { side: 'right', lines: ["Knock knock.", "Race condition.", "Who's there?"], icon: "🏎️" },
  // 31–32: Halloween/Christmas (connected pair)
  { side: 'left', lines: ["Why do programmers", "mix up Halloween", "and Christmas?"], connectNext: true, icon: "🎃" },
  { side: 'right', lines: ["Because", "Oct 31 == Dec 25"], punchline: true, icon: "🎄" },
  // 33–34: Uninitialized variable (connected pair)
  { side: 'left', lines: ["I'd tell you a joke", "about an uninitialized", "variable..."], connectNext: true, icon: "❓" },
  { side: 'right', lines: ["But it hasn't been", "defined yet."], punchline: true, icon: "🫥" },
  // 35–36: OOP wealth (connected pair)
  { side: 'left', lines: ["What's the OOP way", "to become wealthy?"], connectNext: true, icon: "💰" },
  { side: 'right', lines: ["Inheritance."], punchline: true, icon: "👑" },
  // 37–38: Sync phone (connected pair)
  { side: 'left', lines: ["Told my wife I was", "going to sync", "my phone."], connectNext: true, icon: "📱" },
  { side: 'right', lines: ["She asked if it", "would float first."], punchline: true, icon: "🏊" },
];

const JOKE_SPACING = 210;
const JOKE_BLOCK_HEIGHT = JOKES.length * JOKE_SPACING;

export default function ProjectDetail() {
  const { id } = useParams();
  const [showDoodle, setShowDoodle] = useState(true);
  const { portfolioData } = usePortfolio();
  const project = portfolioData.projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--background)] text-[hsl(var(--foreground))]">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Link to="/" className="text-[hsl(var(--accent))] hover:underline">← Back to Home</Link>
      </div>
    );
  }

  /* Helper: build a wobbly hand-drawn path between two y-positions on the trunk */
  const connectorPath = (y1, y2) => {
    const midY = (y1 + y2) / 2;
    return `M 110 ${y1} C 80 ${y1 + 30}, 140 ${midY - 20}, 110 ${midY} S 80 ${y2 - 30}, 110 ${y2}`;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[hsl(var(--foreground))] overflow-x-hidden">

      {/* ── Back button ── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors group hero-hand-desc font-bold text-lg"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Projects
        </Link>
      </div>

      {/* ── HERO ── */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="max-w-4xl mx-auto px-5 sm:px-8 pt-10 pb-12"
      >
        {/* Badges */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
          {project.spotlight && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 to-purple-500 shadow-[0_2px_12px_rgba(99,102,241,0.4)]">
              ✦ Spotlight
            </span>
          )}
          {project.tag && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[hsl(var(--accent)/0.12)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.25)]">
              {project.tag}
            </span>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-[hsl(var(--foreground))] hero-hand-title"
        >
          {project.title}
        </motion.h1>

        {/* One-liner lead */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-[hsl(var(--muted-foreground))] leading-relaxed mb-8 max-w-2xl hero-hand-desc font-medium"
        >
          {project.description}
        </motion.p>

        {/* Action links */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="hero-hand-btn"
            >
              <Globe size={16} /> Live Site <ExternalLink size={13} className="opacity-60" />
            </a>
          )}
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="hero-hand-btn hero-hand-btn--ghost"
            >
              <Github size={16} /> Source Code
            </a>
          )}
        </motion.div>
      </motion.div>

      {/* ── IMAGE GALLERY / HERO IMAGE ── */}
      {project.gallery && project.gallery.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16"
        >
          <div className="relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-white/60 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 rotate-[-3deg] z-10 shadow-sm" />
            <div className="overflow-hidden border-[2.5px] border-[var(--foreground)] dark:border-white/30 shadow-[6px_6px_0px_0px_var(--foreground)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] bg-[var(--card-bg)]" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: true }}
                loop={project.gallery.length > 1}
                className="w-full"
                style={{ aspectRatio: '16/9' }}
              >
                {project.gallery.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-full object-contain bg-[var(--background)]"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          {project.gallery.length > 1 && (
            <p className="text-center text-xs text-[hsl(var(--muted-foreground))] mt-3">
              {project.gallery.length} screenshots — swipe or use arrows to browse
            </p>
          )}
        </motion.div>
      ) : project.image ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16"
        >
          <div className="relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-white/60 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 rotate-[-2deg] z-10 shadow-sm" />
            <div className="overflow-hidden border-[2.5px] border-[var(--foreground)] dark:border-white/30 shadow-[6px_6px_0px_0px_var(--foreground)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] bg-[var(--card-bg)]" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full object-cover object-top max-h-[520px]"
              />
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* ── MAIN CONTENT — narrow, readable column ── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-14 relative">

          {/* ══════ THE HUMOR THREAD ══════ */}
          <div className={`hidden lg:block absolute right-0 top-0 w-[220px] h-full z-0 pointer-events-none text-[hsl(var(--accent))] transition-opacity duration-700 ${showDoodle ? 'opacity-65 dark:opacity-50' : 'opacity-0'}`}>
            <svg width="100%" height="100%" className="overflow-visible">
              <defs>
                {/* SVG drop shadow filter — CSS shadows don't work on SVG elements */}
                <filter id="cardShadow" x="-20%" y="-10%" width="150%" height="130%">
                  <feDropShadow dx="4" dy="4" stdDeviation="0" floodColor="currentColor" floodOpacity="0.15" />
                </filter>
              </defs>

              {[0, 1, 2, 3, 4, 5].map(loopIndex => {
                const yOff = loopIndex * JOKE_BLOCK_HEIGHT;
                return (
                  <g key={loopIndex} transform={`translate(0, ${yOff})`}>

                    {/* ── Main trunk: gentle sine wave ── */}
                    <path
                      d={`M 110 0 ${JOKES.map((_, i) => {
                        const y = (i + 1) * JOKE_SPACING;
                        const wobble = (i % 2 === 0) ? 125 : 95;
                        return `Q ${wobble} ${y - JOKE_SPACING / 2}, 110 ${y}`;
                      }).join(' ')}`}
                      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    />

                    {/* ── Small decorative branch stubs every few jokes ── */}
                    {JOKES.map((_, i) => {
                      if (i % 5 !== 2) return null; // every 5th joke gets a branch
                      if (yOff === 0 && i < 6) return null;
                      const y = i * JOKE_SPACING + 150;
                      const dir = i % 2 === 0 ? 1 : -1;
                      return (
                        <g key={`branch-${i}`} opacity="0.35">
                          <path
                            d={`M 110 ${y} Q ${110 + dir * 25} ${y - 12}, ${110 + dir * 40} ${y - 20}`}
                            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                          />
                          <circle cx={110 + dir * 40} cy={y - 20} r="3" fill="currentColor" opacity="0.5" />
                        </g>
                      );
                    })}

                    {/* ── Jokes ── */}
                    {JOKES.map((joke, i) => {
                      if (yOff === 0 && i < 6) return null;

                      const yBase = i * JOKE_SPACING;
                      const dotY = yBase + 150;
                      const isRight = joke.side === 'right';
                      const textX = isRight ? 130 : 90;

                      return (
                        <g key={`joke-${i}`}>

                          {/* ── Connector bracket for connected joke pairs ── */}
                          {joke.connectNext && (
                            <g opacity="0.6">
                              {/* Curvy dashed bracket on the opposite side of the trunk */}
                              <path
                                d={connectorPath(dotY, dotY + JOKE_SPACING)}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                                strokeLinecap="round"
                              />
                              {/* Small "link" icon at the midpoint */}
                              <g transform={`translate(${isRight ? 60 : 155}, ${dotY + JOKE_SPACING / 2 - 6})`}>
                                <text fontSize="13" fill="currentColor" opacity="0.7">🔗</text>
                              </g>
                              {/* Top & bottom connector ticks */}
                              <line x1={isRight ? 115 : 105} y1={dotY} x2={isRight ? 125 : 95} y2={dotY} stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                              <line x1={isRight ? 115 : 105} y1={dotY + JOKE_SPACING} x2={isRight ? 125 : 95} y2={dotY + JOKE_SPACING} stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                            </g>
                          )}

                          {/* ── Trunk dot (bigger for punchlines) ── */}
                          <circle
                            cx="110" cy={dotY}
                            r={joke.punchline ? 7 : 5}
                            fill={joke.punchline ? "currentColor" : "var(--background)"}
                            stroke="currentColor"
                            strokeWidth={joke.punchline ? 0 : 2.5}
                          />

                          {/* ── Emoji icon ── */}
                          {joke.icon && (
                            <text
                              x={isRight ? textX - 2 : textX + 2}
                              y={yBase + 125}
                              textAnchor={isRight ? 'start' : 'end'}
                              fontSize="18"
                              opacity="0.85"
                            >
                              {joke.icon}
                            </text>
                          )}

                          {/* ── Main text (headline) ── */}
                          <text
                            x={textX}
                            y={yBase + 148}
                            textAnchor={isRight ? 'start' : 'end'}
                            className="hero-hand-desc"
                            fill="currentColor"
                            fontSize={joke.punchline ? "15" : "13"}
                            fontWeight={joke.punchline ? "900" : "700"}
                            opacity={joke.punchline ? "1" : "0.9"}
                          >
                            {joke.lines.map((line, li) => (
                              <tspan
                                key={li}
                                x={textX}
                                dy={li === 0 ? "0" : "17"}
                              >
                                {line}
                              </tspan>
                            ))}
                          </text>

                          {/* ── Sub-lines (smaller, lighter) ── */}
                          {joke.sublines && (
                            <text
                              x={textX}
                              y={yBase + 148 + joke.lines.length * 17 + 4}
                              textAnchor={isRight ? 'start' : 'end'}
                              className="hero-hand-desc"
                              fill="currentColor"
                              fontSize="11"
                              opacity="0.6"
                            >
                              {joke.sublines.map((line, li) => (
                                <tspan
                                  key={li}
                                  x={textX}
                                  dy={li === 0 ? "0" : "15"}
                                >
                                  {line}
                                </tspan>
                              ))}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── LEFT: Case study narrative ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {/* Tech stack — inline, before the write-up */}
            <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-[var(--card-border)]">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[hsl(var(--accent)/0.1)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.2)]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Markdown body */}
            <div className="prose max-w-none
              prose-headings:hero-hand-title prose-headings:font-bold prose-headings:text-[var(--foreground)]
              prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-5
              prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:border-b-2 prose-h2:border-[var(--foreground)] dark:prose-h2:border-white/30 prose-h2:pb-3
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-[var(--foreground)] prose-p:opacity-85 prose-p:leading-[1.85] prose-p:text-[1.1rem] prose-p:my-4 prose-p:font-medium
              prose-li:text-[var(--foreground)] prose-li:opacity-85 prose-li:leading-[1.85] prose-li:text-[1.1rem] prose-li:font-medium
              prose-ul:my-4 prose-ul:space-y-1
              prose-ol:my-4
              prose-strong:text-[var(--foreground)] prose-strong:font-bold prose-strong:opacity-100
              prose-a:text-[hsl(var(--accent))] prose-a:no-underline hover:prose-a:underline prose-a:hero-hand-desc prose-a:text-xl
              prose-blockquote:border-l-4 prose-blockquote:border-[hsl(var(--accent))] prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-[var(--foreground)] prose-blockquote:opacity-75 prose-blockquote:my-8 prose-blockquote:hero-hand-desc prose-blockquote:text-xl
              prose-hr:border-[var(--foreground)] dark:prose-hr:border-white/30 prose-hr:my-12 prose-hr:border-t-2
              prose-code:text-[hsl(var(--accent))] prose-code:bg-[hsl(var(--accent)/0.08)] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.88em] prose-code:font-mono
              prose-pre:bg-[var(--card-bg)] prose-pre:border-2 prose-pre:border-[var(--foreground)] dark:prose-pre:border-white/30 prose-pre:shadow-[4px_4px_0px_0px_var(--foreground)] dark:prose-pre:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] prose-pre:p-5
              prose-img:border-2 prose-img:border-[var(--foreground)] dark:prose-img:border-white/30 prose-img:shadow-[4px_4px_0px_0px_var(--foreground)] dark:prose-img:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] prose-img:my-8
            ">
              <ReactMarkdown>
                {project.longDescription || project.description}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* ── RIGHT: Sticky sidebar ── */}
          <div className="relative w-full h-full">

            <motion.aside
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-5 z-10"
            >
              {/* Links card */}
              {((project.demo && project.demo !== '#') || (project.github && project.github !== '#')) && (
                <div className="relative border-[2px] border-[var(--foreground)] dark:border-white/30 shadow-[4px_4px_0px_0px_var(--foreground)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] bg-[var(--card-bg)] backdrop-blur-xl p-5" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 rotate-[4deg] z-10 shadow-sm" />
                  <p className="hero-hand-desc text-xl font-bold text-[hsl(var(--foreground))] mb-4">Links</p>
                  <div className="space-y-2">
                    {project.demo && project.demo !== '#' && (
                      <a href={project.demo} target="_blank" rel="noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5 border-[2px] border-transparent hover:border-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] dark:hover:border-white/30 dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] bg-[hsl(var(--accent)/0.08)] hover:bg-[hsl(var(--accent)/0.16)] text-[hsl(var(--foreground))] transition-all duration-200 group text-sm font-bold"
                        style={{ borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px" }}
                      >
                        <Globe size={14} className="text-[hsl(var(--accent))] flex-shrink-0" />
                        <span className="flex-1 hero-hand-desc text-lg">Live Site</span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                      </a>
                    )}
                    {project.github && project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5 border-[2px] border-transparent hover:border-[var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] dark:hover:border-white/30 dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] bg-[hsl(var(--accent)/0.08)] hover:bg-[hsl(var(--accent)/0.16)] text-[hsl(var(--foreground))] transition-all duration-200 group text-sm font-bold"
                        style={{ borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px" }}
                      >
                        <Github size={14} className="text-[hsl(var(--accent))] flex-shrink-0" />
                        <span className="flex-1 hero-hand-desc text-lg">Source Code</span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Built with */}
              <div className="relative border-[2px] border-[var(--foreground)] dark:border-white/30 shadow-[4px_4px_0px_0px_var(--foreground)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] bg-[var(--card-bg)] backdrop-blur-xl p-5 mt-6" style={{ borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px" }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 rotate-[-4deg] z-10 shadow-sm" />
                <p className="hero-hand-desc text-xl font-bold text-[hsl(var(--foreground))] mb-4">Built with</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="hero-hand-desc text-base font-bold px-2.5 py-1 border-[2px] border-[var(--foreground)] shadow-[2px_2px_0px_0px_var(--foreground)] dark:border-white/30 dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] bg-[var(--card-bg)] text-[hsl(var(--foreground))] cursor-default hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scroll guide text inside the sticky sidebar as a solid Card! */}
              <div className="relative overflow-hidden rounded-2xl border-[3px] border-[var(--foreground)] bg-[var(--card-bg)]/90 backdrop-blur-xl p-5 shadow-[8px_8px_0px_0px_var(--foreground)] dark:border-white/20 dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] transition-transform hover:-translate-y-1 mt-10" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}>
                 {/* Masking tape */}
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[var(--foreground)] opacity-10 rotate-[-4deg]" style={{ borderRadius: "4px 8px 3px 6px" }}></div>
                 
                 <div className="flex flex-col items-center justify-center opacity-90">
                   <p className="hero-hand-desc text-center text-[15px] font-bold text-[hsl(var(--accent))] leading-snug">
                     scroll for some<br/>comp-sci humor!
                   </p>
                   <svg width="22" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--accent))] mt-3 mb-5 animate-bounce">
                      <path d="M12 2 v20 M5 15 l7 7 7 -7" />
                   </svg>
                   <button 
                     onClick={() => setShowDoodle(!showDoodle)}
                     className="hero-hand-desc text-[13px] px-3.5 py-1.5 rounded-full border-[2px] border-[var(--foreground)] dark:border-white/30 text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] dark:hover:bg-white dark:hover:text-black transition-colors font-bold shadow-[2px_2px_0px_0px_var(--foreground)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                     style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
                   >
                     {showDoodle ? 'Hide Thread' : 'Show Thread'}
                   </button>
                 </div>
              </div>
            </motion.aside>
          </div>
        </div>


      </div>
    </div>
  );
}
