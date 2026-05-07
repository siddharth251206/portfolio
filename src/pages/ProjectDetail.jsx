import { useEffect } from 'react';
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

export default function ProjectDetail() {
  const { id } = useParams();
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

  return (
    <div className="min-h-screen bg-[var(--background)] text-[hsl(var(--foreground))] overflow-x-hidden">

      {/* ── Back button ── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors group"
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
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-[hsl(var(--foreground))]"
        >
          {project.title}
        </motion.h1>

        {/* One-liner lead */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-[hsl(var(--muted-foreground))] leading-relaxed mb-8 max-w-2xl"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-bold text-sm shadow-[0_4px_18px_hsl(var(--accent)/0.35)] hover:shadow-[0_6px_26px_hsl(var(--accent)/0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <Globe size={16} /> Live Site <ExternalLink size={13} className="opacity-60" />
            </a>
          )}
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[hsl(var(--accent)/0.1)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.25)] font-bold text-sm hover:bg-[hsl(var(--accent)/0.2)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
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
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--card-border)] shadow-2xl shadow-black/20 bg-[var(--card-bg)]">
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
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--card-border)] shadow-2xl shadow-black/20">
            <img
              src={project.image}
              alt={project.title}
              className="w-full object-cover object-top max-h-[520px]"
            />
          </div>
        </motion.div>
      ) : null}

      {/* ── MAIN CONTENT — narrow, readable column ── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-14 items-start">

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
              prose-headings:font-black prose-headings:tracking-tight prose-headings:text-[var(--foreground)]
              prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-5
              prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:border-b prose-h2:border-[var(--card-border)] prose-h2:pb-3
              prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-[var(--foreground)] prose-p:opacity-75 prose-p:leading-[1.85] prose-p:text-[1.05rem] prose-p:my-4
              prose-li:text-[var(--foreground)] prose-li:opacity-75 prose-li:leading-[1.85] prose-li:text-[1.05rem]
              prose-ul:my-4 prose-ul:space-y-1
              prose-ol:my-4
              prose-strong:text-[var(--foreground)] prose-strong:font-bold prose-strong:opacity-100
              prose-a:text-[hsl(var(--accent))] prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-[hsl(var(--accent))] prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-[var(--foreground)] prose-blockquote:opacity-60 prose-blockquote:my-8
              prose-hr:border-[var(--card-border)] prose-hr:my-12
              prose-code:text-[hsl(var(--accent))] prose-code:bg-[hsl(var(--accent)/0.08)] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.88em] prose-code:font-mono
              prose-pre:bg-[var(--card-bg)] prose-pre:border prose-pre:border-[var(--card-border)] prose-pre:rounded-xl prose-pre:p-5
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
            ">
              <ReactMarkdown>
                {project.longDescription || project.description}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* ── RIGHT: Sticky sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-5 lg:sticky lg:top-10"
          >
            {/* Links card */}
            {((project.demo && project.demo !== '#') || (project.github && project.github !== '#')) && (
              <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-4">Links</p>
                <div className="space-y-2">
                  {project.demo && project.demo !== '#' && (
                    <a href={project.demo} target="_blank" rel="noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[hsl(var(--accent)/0.08)] hover:bg-[hsl(var(--accent)/0.16)] text-[hsl(var(--foreground))] transition-colors group text-sm font-medium"
                    >
                      <Globe size={14} className="text-[hsl(var(--accent))] flex-shrink-0" />
                      <span className="flex-1">Live Site</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                    </a>
                  )}
                  {project.github && project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[hsl(var(--accent)/0.08)] hover:bg-[hsl(var(--accent)/0.16)] text-[hsl(var(--foreground))] transition-colors group text-sm font-medium"
                    >
                      <Github size={14} className="text-[hsl(var(--accent))] flex-shrink-0" />
                      <span className="flex-1">Source Code</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Built with */}
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-4">Built with</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-lg border border-[var(--card-border)] bg-[hsl(var(--muted)/0.3)] text-[hsl(var(--foreground))] hover:border-[hsl(var(--accent)/0.4)] hover:text-[hsl(var(--accent))] transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>


      </div>
    </div>
  );
}
