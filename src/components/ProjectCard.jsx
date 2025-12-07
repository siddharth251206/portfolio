import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isReversed ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`
        flex flex-col md:flex-row items-center gap-8 sm:gap-12 
        ${isReversed ? "md:flex-row-reverse" : ""}
      `}
    >
      {/* PROJECT IMAGE */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
        className="
          w-full md:w-1/2 rounded-2xl sm:rounded-3xl overflow-hidden 
          shadow-[0_20px_40px_var(--card-shadow)] z-5
        "
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-2xl sm:rounded-3xl"
        />
      </motion.div>

      {/* CONTENT CARD */}
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 20px 40px var(--card-shadow)" }}
        transition={{ duration: 0.35 }}
        className="
          w-full md:w-1/2 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl
          bg-[var(--card-bg)]
          border border-[var(--card-border)]
          shadow-xl shadow-[var(--card-shadow)]
          backdrop-blur-2xl
          text-[hsl(var(--foreground))]
          md:-translate-y-2 z-5
        "
      >
        {/* TITLE */}
        <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
          {project.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-base sm:text-lg mb-4 sm:mb-6 text-[hsl(var(--muted-foreground))] leading-relaxed">
          {project.description}
        </p>

        {/* TECH TAGS */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="
                px-2.5 sm:px-3 py-1 text-xs sm:text-sm rounded-full
                bg-[hsl(var(--accent))/0.15)] 
                text-[hsl(var(--accent))]
                font-medium
              "
            >
              {t}
            </span>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          {project.demo && project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              className="
                flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                bg-[hsl(var(--accent))] text-black font-semibold
                hover:opacity-90 transition text-sm sm:text-base
              "
            >
              <Globe size={18} /> Live
            </a>
          )}

          <a
            href={project.github}
            target="_blank"
            className="
              flex items-center justify-center gap-2 px-4 py-2 rounded-lg
              font-semibold transition text-sm sm:text-base
              bg-[var(--btn-secondary-bg)]
              text-[var(--btn-secondary-text)]
              border border-[var(--btn-secondary-border)]
              hover:bg-[var(--btn-secondary-hover)]
            "
          >
            <Github size={18} /> GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}