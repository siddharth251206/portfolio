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
{/* <div className="fixed inset-0 pointer-events-none z-[1]">
  <div
    className="
      absolute inset-0 
      shadow-[inset_0_0_80px_rgba(0,0,0,0.12)]
      dark:shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]
    " 
  />
</div> */}
{/* <div className="fixed inset-0 pointer-events-none z-0">
  <div className="absolute w-[60vw] h-[60vw] top-[10vh] left-[10vw] 
    rounded-full blur-[120px] opacity-70"
    style={{ background: "var(--bg-blur-1)" }}
  />
  <div className="absolute w-[50vw] h-[50vw] bottom-[5vh] right-[15vw]
    rounded-full blur-[140px] opacity-60"
    style={{ background: "var(--bg-blur-2)" }}
  />
  <div className="absolute w-[40vw] h-[40vw] top-[50vh] right-[5vw]
    rounded-full blur-[160px] opacity-55"
    style={{ background: "var(--bg-blur-3)" }}
  />
</div> */}
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
      <div className="relative h-[0px]">
  <div className="torn-divider"></div>
</div>
      <Footer />
      <div id="cursor-contrast"></div>
      
</>);
}