import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import FloatingParticle from "../components/FloatingParticle";
import { projects } from "../assets/projectData"
import { itemReveal } from "../animations/reveal";
import SectionParticles from "./SectionParticles";


export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-12 text-[hsl(var(--foreground))]">

      <div className="flex justify-center mb-20">
  <motion.h2
    variants={itemReveal}
    className="relative inline-block text-5xl md:text-6xl font-extrabold text-center"
  >
    Projects
    <span className="absolute left-1/2 -bottom-4 -translate-x-1/2 
      w-50 h-[3px] bg-[hsl(var(--accent))] rounded-full"></span>
  </motion.h2>
</div>



      <div className="space-y-32 max-w-6xl mx-auto">
        {projects.map((p, index) => (
          <ProjectCard key={index} project={p} index={index} />
        ))}
      </div>
      <SectionParticles count={40} />
    </section>
  );
}
