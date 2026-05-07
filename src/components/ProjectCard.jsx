import { motion } from "framer-motion";
import { Github, Globe, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProjectCard({ project, index }) {
  const isSpotlight = project.spotlight;
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group ${isSpotlight ? "spotlight-card" : ""}`}
    >
      {/* ── Spotlight animated border ── */}
      {isSpotlight && (
        <>
          <div className="absolute -inset-[2px] rounded-[1.75rem] z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_75%,#ff0095_80%,#006aff_87%,#00ffcc_94%,#ff4545_100%)] animate-[spin_5s_linear_infinite]" />
          </div>
          <div className="absolute -inset-[2px] rounded-[1.75rem] z-[1] pointer-events-none bg-[var(--background)] m-[2px] rounded-[1.6rem]" />
        </>
      )}

      {/* ── Card body ── */}
      <div
        className={`relative z-[2] flex flex-col rounded-[1.6rem] overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-xl shadow-[0_8px_40px_var(--card-shadow)] transition-shadow duration-500 group-hover:shadow-[0_16px_60px_var(--card-shadow)]`}
      >
        {/* ── Image area ── */}
        <div className="relative w-full overflow-hidden h-[240px] sm:h-[280px] bg-[hsl(var(--muted)/0.15)]">
          {!imgError && project.image ? (
            <img
              src={project.image}
              alt={project.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[hsl(var(--muted-foreground))]">
              <span className="text-5xl opacity-30">⬡</span>
            </div>
          )}

          {/* Gradient scrim at the bottom of the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* ── Badges floating on the image ── */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {isSpotlight && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest text-white bg-gradient-to-r from-[#006aff] to-[#00ffcc] shadow-[0_0_16px_rgba(0,106,255,0.5)]">
                ✦ Spotlight
              </span>
            )}
            {project.tag && (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/40 text-white border border-white/20 backdrop-blur-sm">
                {project.tag}
              </span>
            )}
          </div>

          {/* ── Quick-action buttons floating on image bottom-right ── */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                title="Live Demo"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm text-white hover:bg-white/25 transition-colors duration-200"
              >
                <Globe size={15} />
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm text-white hover:bg-white/25 transition-colors duration-200"
              >
                <Github size={15} />
              </a>
            )}
          </div>
        </div>

        {/* ── Content area ── */}
        <div className="flex flex-col flex-1 p-6 sm:p-8">
          {/* Title */}
          <Link
            to={`/project/${project.id || project.title}`}
            className="group/title inline-block mb-3 w-fit"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] group-hover/title:text-[hsl(var(--accent))] transition-colors duration-200 leading-snug">
              {project.title}
            </h3>
          </Link>

          {/* Description — clamped to 3 lines */}
          <p className="text-sm sm:text-base text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-3 mb-5">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 6).map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-[hsl(var(--accent)/0.12)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.2)]"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 6 && (
              <span className="px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-[hsl(var(--muted)/0.5)] text-[hsl(var(--muted-foreground))] border border-[var(--card-border)]">
                +{project.tech.length - 6} more
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <Link
              to={`/project/${project.id || project.title}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] shadow-[0_4px_20px_hsl(var(--accent)/0.3)] hover:shadow-[0_6px_28px_hsl(var(--accent)/0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              View Project <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}