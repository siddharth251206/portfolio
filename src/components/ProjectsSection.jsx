import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import SectionParticles from "./SectionParticles";
import { usePortfolio } from "../context/PortfolioContext";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { useState } from "react";

// ── Spotlight hero card (full-width, prominent) ──────────────────────────────
function SpotlightHeroCard({ project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative group w-full"
    >
      {/* Animated neon border — elegant, not overwhelming */}
      <div className="absolute -inset-[2px] rounded-[2rem] z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_82%,#006aff_87%,#00e5ff_92%,#a855f7_97%,transparent_100%)] animate-[spin_7s_linear_infinite]" />
      </div>

      <div className="relative z-[1] flex flex-col lg:flex-row rounded-[1.9rem] overflow-hidden border border-white/10 bg-[var(--card-bg)] backdrop-blur-xl shadow-[0_20px_80px_var(--card-shadow)]">

        {/* Image side */}
        <div className="relative lg:w-[55%] h-[300px] sm:h-[380px] lg:h-[480px] overflow-hidden flex-shrink-0">
          {!imgError && project.image ? (
            <>
              {/* Blurred background fill — oversized to eliminate any gap */}
              <img
                src={project.image}
                alt=""
                aria-hidden="true"
                className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] object-cover blur-3xl opacity-90 saturate-150"
              />
              {/* Sharp image centered on top */}
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImgError(true)}
                className="relative z-[1] w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[hsl(var(--muted-foreground))] text-6xl opacity-20">⬡</div>
          )}
          {/* Fade into text side — desktop only */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--card-bg)] pointer-events-none hidden lg:block opacity-70 z-[2]" />

          {/* Badges */}
          <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-[#006aff] via-[#a855f7] to-[#00ffcc] shadow-[0_0_24px_rgba(0,106,255,0.6)]">
              ✦ Spotlight
            </span>
            {project.tag && (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/40 text-white border border-white/20 backdrop-blur-sm">
                {project.tag}
              </span>
            )}
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center flex-1 p-8 sm:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--accent))] mb-4">Featured Project</p>

          <Link to={`/project/${project.id || project.title}`} className="group/title w-fit mb-4">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-[hsl(var(--foreground))] group-hover/title:text-[hsl(var(--accent))] transition-colors duration-200">
              {project.title}
            </h3>
          </Link>

          <p className="text-base sm:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-8 max-w-xl line-clamp-4">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 text-xs font-semibold rounded-full bg-[hsl(var(--accent)/0.12)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.25)]">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to={`/project/${project.id || project.title}`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] shadow-[0_4px_24px_hsl(var(--accent)/0.35)] hover:shadow-[0_6px_32px_hsl(var(--accent)/0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Explore Project <ArrowUpRight size={17} />
            </Link>
            {project.demo && project.demo !== "#" && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[hsl(var(--foreground))] hover:border-[hsl(var(--accent)/0.5)] hover:text-[hsl(var(--accent))] transition-all duration-200" title="Live Demo">
                <Globe size={18} />
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[hsl(var(--foreground))] hover:border-[hsl(var(--accent)/0.5)] hover:text-[hsl(var(--accent))] transition-all duration-200" title="GitHub">
                <Github size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const { portfolioData } = usePortfolio();
  const { projects } = portfolioData;

  const spotlightProjects = projects.filter(p => p.spotlight);
  const regularProjects   = projects.filter(p => !p.spotlight);

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 text-[hsl(var(--foreground))]"
    >
      {/* Section heading */}
      <div className="flex justify-center mb-16 sm:mb-20 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="relative inline-block text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center">
            Projects
            <span className="absolute left-1/2 -bottom-3 sm:-bottom-4 -translate-x-1/2 w-32 sm:w-44 h-[3px] bg-[hsl(var(--accent))] rounded-full" />
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[hsl(var(--muted-foreground))] max-w-lg mx-auto leading-relaxed">
            A collection of what I've shipped — from hackathon sprints to full production apps.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">

        {/* ── Featured spotlight projects ── */}
        {spotlightProjects.length > 0 && (
          <div className="space-y-14">
            {spotlightProjects.map((p) => (
              <SpotlightHeroCard key={p._dndId || p.id} project={p} />
            ))}
          </div>
        )}

        {/* ── Divider between spotlight and regular ── */}
        {spotlightProjects.length > 0 && regularProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 h-px bg-[var(--card-border)]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] px-3 whitespace-nowrap">
              More Projects
            </span>
            <div className="flex-1 h-px bg-[var(--card-border)]" />
          </motion.div>
        )}

        {/* ── Regular projects grid ── */}
        {regularProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularProjects.map((p, i) => (
              <RegularCard key={p._dndId || p.id || i} project={p} index={i} />
            ))}
          </div>
        )}

        {/* Fallback: no spotlight — just a grid of all projects */}
        {spotlightProjects.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((p, i) => (
              <RegularCard key={p._dndId || p.id || i} project={p} index={i} />
            ))}
          </div>
        )}
      </div>

      <SectionParticles count={30} />
    </section>
  );
}

// ── Compact grid card for non-spotlight projects ──────────────────────────────
function RegularCard({ project, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-[1.4rem] overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-xl shadow-[0_6px_30px_var(--card-shadow)] hover:shadow-[0_12px_50px_var(--card-shadow)] transition-shadow duration-500"
    >
      {/* Image */}
      <div className="relative w-full h-[200px] overflow-hidden bg-[hsl(var(--muted)/0.2)]">
        {!imgError && project.image ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">⬡</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

        {/* Tag */}
        {project.tag && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/40 text-white border border-white/20 backdrop-blur-sm z-10">
            {project.tag}
          </span>
        )}

        {/* Quick actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 z-10">
          {project.demo && project.demo !== "#" && (
            <a href={project.demo} target="_blank" rel="noreferrer" title="Live Demo"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm text-white hover:bg-white/25 transition-colors">
              <Globe size={13} />
            </a>
          )}
          {project.github && project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noreferrer" title="GitHub"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm text-white hover:bg-white/25 transition-colors">
              <Github size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <Link to={`/project/${project.id || project.title}`} className="group/title w-fit mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] group-hover/title:text-[hsl(var(--accent))] transition-colors duration-200 leading-snug">
            {project.title}
          </h3>
        </Link>

        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={i} className="px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold rounded-full bg-[hsl(var(--accent)/0.1)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.2)]">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold rounded-full bg-[hsl(var(--muted)/0.4)] text-[hsl(var(--muted-foreground))] border border-[var(--card-border)]">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <Link
            to={`/project/${project.id || project.title}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[hsl(var(--accent))] hover:gap-2.5 transition-all duration-200"
          >
            View Project <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}