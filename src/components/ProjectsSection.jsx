import { motion } from "framer-motion";
import SectionParticles from "./SectionParticles";
import { usePortfolio } from "../context/PortfolioContext";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { useState } from "react";

// Wobbly border-radius presets — for the OUTER card only
const WOBBLY = [
  "255px 15px 225px 15px / 15px 225px 15px 255px",
  "15px 225px 15px 255px / 255px 15px 225px 15px",
  "225px 15px 255px 15px / 15px 255px 15px 225px",
  "15px 255px 15px 225px / 225px 15px 255px 15px",
  "200px 20px 200px 20px / 20px 200px 20px 200px",
];

const ROTATIONS = [-1.2, 0.8, -0.6, 1.4, -1, 0.5];

// ── Spotlight hero card ──────────────────────────────────────────────────────
function SpotlightHeroCard({ project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="proj-spotlight-wrapper"
    >
      {/* Animated dashed scribble border — spotlight effect */}
      <div className="proj-spotlight-border" />

      <div
        className="proj-card proj-card--spotlight"
        style={{ borderRadius: WOBBLY[0] }}
      >
        {/* Pushpin at top center */}
        <div className="proj-pushpin">
          <div className="proj-pushpin-head" />
          <div className="proj-pushpin-needle" />
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Image side — NO wobbly radius, full image visible */}
          <div className="relative lg:w-[55%] h-[260px] sm:h-[340px] lg:h-[420px] overflow-hidden flex-shrink-0">
            {!imgError && project.image ? (
              <>
                <img src={project.image} alt="" aria-hidden="true"
                  className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] object-cover blur-3xl opacity-80 saturate-150" />
                <img src={project.image} alt={project.title}
                  onError={() => setImgError(true)}
                  className="relative z-[1] w-full h-full object-contain transition-transform duration-500" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">⬡</div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              <span className="proj-badge-spotlight">✦ Spotlight</span>
              {project.tag && <span className="proj-badge-tag">{project.tag}</span>}
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-center flex-1 p-6 sm:p-8 lg:p-10">
            <p className="proj-eyebrow">Featured Project</p>

            <Link to={`/project/${project.id || project.title}`} className="group/title w-fit mb-3">
              <h3 className="proj-title proj-title--lg">{project.title}</h3>
            </Link>

            <p className="proj-desc mb-6 max-w-xl line-clamp-4">{project.description}</p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, i) => (
                <span key={i} className="proj-tech-tag"
                  style={{ borderRadius: WOBBLY[i % WOBBLY.length] }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link to={`/project/${project.id || project.title}`}
                className="proj-cta-btn">
                Explore Project <ArrowUpRight size={16} />
              </Link>
              {project.demo && project.demo !== "#" && (
                <a href={project.demo} target="_blank" rel="noreferrer"
                  className="proj-icon-btn" title="Live Demo">
                  <Globe size={16} />
                </a>
              )}
              {project.github && project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="proj-icon-btn" title="GitHub">
                  <Github size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Regular project card ─────────────────────────────────────────────────────
function RegularCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const wobbly = WOBBLY[index % WOBBLY.length];
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const usePin = index % 2 === 1; // alternate tape & pin

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{
        scale: 1.04, rotate: 0, y: -8,
        transition: { type: "spring", stiffness: 350, damping: 15 }
      }}
      className="proj-card"
      style={{ borderRadius: wobbly }}
    >
      {/* Tape or Pushpin */}
      {!usePin && <div className="proj-tape-inner" />}
      {usePin && (
        <div className="proj-pushpin proj-pushpin--small">
          <div className="proj-pushpin-head proj-pushpin-head--small" />
          <div className="proj-pushpin-needle proj-pushpin-needle--small" />
        </div>
      )}

      {/* Image — plain rectangular, no wobbly clip */}
      <div className="proj-card-img">
        {!imgError && project.image ? (
          <img src={project.image} alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">⬡</div>
        )}

        {/* Tag */}
        {project.tag && (
          <span className="proj-badge-tag absolute top-3 left-3 z-10">{project.tag}</span>
        )}

        {/* Quick action icons */}
        <div className="absolute bottom-3 right-3 flex gap-2 z-10">
          {project.demo && project.demo !== "#" && (
            <a href={project.demo} target="_blank" rel="noreferrer" title="Live Demo"
              className="proj-img-action"><Globe size={13} /></a>
          )}
          {project.github && project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noreferrer" title="GitHub"
              className="proj-img-action"><Github size={13} /></a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <Link to={`/project/${project.id || project.title}`} className="group/title w-fit mb-2">
          <h3 className="proj-title">{project.title}</h3>
        </Link>

        <p className="proj-desc line-clamp-2 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={i} className="proj-tech-tag proj-tech-tag--sm"
              style={{ borderRadius: WOBBLY[i % WOBBLY.length] }}>
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="proj-tech-tag proj-tech-tag--sm proj-tech-tag--muted">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <Link to={`/project/${project.id || project.title}`}
            className="proj-view-link">
            View Project <ArrowUpRight size={15} />
          </Link>
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
    <section id="projects"
      className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12">

      {/* Section heading */}
      <div className="flex justify-center mb-16 sm:mb-20 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="proj-heading">
            Projects
            <span className="proj-heading-underline" />
          </h2>
          <p className="proj-subtitle">
            A collection of what I've shipped — from hackathon sprints to full production apps.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">

        {/* Featured spotlight projects */}
        {spotlightProjects.length > 0 && (
          <div className="space-y-14">
            {spotlightProjects.map((p) => (
              <SpotlightHeroCard key={p._dndId || p.id} project={p} />
            ))}
          </div>
        )}

        {/* Divider */}
        {spotlightProjects.length > 0 && regularProjects.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex items-center gap-4">
            <div className="flex-1 h-[2px] border-t-2 border-dashed border-current opacity-15" />
            <span className="proj-divider-label">More Projects</span>
            <div className="flex-1 h-[2px] border-t-2 border-dashed border-current opacity-15" />
          </motion.div>
        )}

        {/* Regular projects grid */}
        {regularProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9">
            {regularProjects.map((p, i) => (
              <RegularCard key={p._dndId || p.id || i} project={p} index={i} />
            ))}
          </div>
        )}

        {/* Fallback: no spotlight */}
        {spotlightProjects.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9">
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