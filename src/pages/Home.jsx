import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TornOverlay from "../components/TornOverlay";
export default function Home() {

return (<>
      <Navbar />
      <Hero />
       <div className="relative w-full">
  <div className="torn-divider flex items-center justify-center">
    
   <TornOverlay />

  </div>
</div>

      <About />
        <div className="relative w-full">
  <div className="torn-divider flex items-center justify-center">
    
   <TornOverlay />

  </div>
</div>
      <Skills />
      <div className="relative w-full">
  <div className="torn-divider flex items-center justify-center">
    
   <TornOverlay />

  </div>
</div>
      <ProjectsSection />
      <div className="relative w-full">
  <div className="torn-divider flex items-center justify-center">
    
   <TornOverlay />

  </div>
</div>
      <Footer />
      <div id="cursor-contrast"></div>
      
</>);
}