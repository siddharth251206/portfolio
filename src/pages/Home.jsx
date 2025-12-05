import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
export default function Home() {

return (<>
{/* GLOBAL CLEAN VIGNETTE */}
<div className="fixed inset-0 pointer-events-none z-[1]">
  <div
    className="
      absolute inset-0 
      shadow-[inset_0_0_80px_rgba(0,0,0,0.12)]
      dark:shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]
    " 
  />
</div>

      <Navbar />
      <Hero />
      <div className="relative h-[0px]">
  <div className="torn-divider"></div>
</div>
      <About />
       <div className="relative h-[0px]">
  <div className="torn-divider"></div>
</div>
      <Skills />
      <div className="relative h-[0px]">
  <div className="torn-divider"></div>
</div>
      <ProjectsSection />
      <Footer />
      <div id="cursor-contrast"></div>
      
</>);
}