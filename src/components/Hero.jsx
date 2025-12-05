import { useEffect, useState } from "react";

export default function Hero() {
  const [showHello, setShowHello] = useState(true);
  const [shiftImage, setShiftImage] = useState(false);
  const [showText, setShowText] = useState(false);

  // Animation sequence
  useEffect(() => {
    const t1 = setTimeout(() => setShowHello(false), 1500); // hello passes
    const t2 = setTimeout(() => setShiftImage(true), 1600); // start shrinking + shifting
    const t3 = setTimeout(() => setShowText(true), 1900);  // word drop intro

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section className="relative h-screen w-full
    text-[hsl(var(--foreground))]
    overflow-hidden">


{/* BACKGROUND SHAPES */}
<div className="absolute inset-0 z-0 pointer-events-none select-none">

  {/* big soft blue aura */}
  <div className="absolute w-[100vw] h-[50vw] rounded-full 
    bg-[#003459]/25 blur-[120px] 
    top-[-5vh] left-[5vw]">
  </div>

  {/* accent right glow */}
  <div className="absolute w-[30vw] h-[30vw] rounded-full 
    bg-[#00A8E8]/20 blur-[100px]
    top-[25vh] right-[2vw]">
  </div>

</div>
{/* FLOATING PARTICLES */}
<div className="absolute inset-0 z-0 pointer-events-none">

  {/* Particle 1 — large */}
  <div className="
    absolute w-5 h-5 rounded-full bg-[#007EA7]/60
    top-[22vh] left-[18vw]
    animate-floatParticle
  "></div>

  {/* Particle 2 — medium */}
  <div className="
    absolute w-4 h-4 rounded-full bg-[#00A8E8]/60
    top-[40vh] left-[32vw]
    animate-floatParticle
    [animation-delay:0.2s]
  "></div>

  {/* Particle 3 — small */}
  <div className="
    absolute w-3 h-3 rounded-full bg-[#003459]/60
    top-[60vh] left-[25vw]
    animate-floatParticle
    [animation-delay:0.35s]
  "></div>

  {/* Particle 4 — large */}
  <div className="
    absolute w-5 h-5 rounded-full bg-[#007EA7]/50
    top-[28vh] left-[60vw]
    animate-floatParticle
    [animation-delay:0.5s]
  "></div>

  {/* Particle 5 — medium */}
  <div className="
    absolute w-4 h-4 rounded-full bg-[#00A8E8]/55
    top-[48vh] left-[72vw]
    animate-floatParticle
    [animation-delay:0.7s]
  "></div>

  {/* Particle 6 — small */}
  <div className="
    absolute w-3 h-3 rounded-full bg-[#003459]/50
    top-[68vh] left-[52vw]
    animate-floatParticle
    [animation-delay:0.9s]
  "></div>

  {/* Particle 7 — medium */}
  <div className="
    absolute w-4 h-4 rounded-full bg-[#00A8E8]/50
    top-[35vh] left-[85vw]
    animate-floatParticle
    [animation-delay:1.1s]
  "></div>

</div>


      {/* BACKGROUND SHAPES, NOISE, GLOW CAN BE ADDED HERE */}

{/* LEFT TEXT AREA */}
<div className="absolute left-[18vw] top-[20vh] z-10 max-w-[650px]">
  {showText && (
    <div className="space-y-4 text-left">
       <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-[hsl(var(--foreground))]">
        <span className="worddrop" style={{ animationDelay: "0.0s" }}>
          Hi, I’m <span className="text-[hsl(var(--accent))]">Siddharth</span> Sheth — 
        </span>
        <br />
        <span className="worddrop" style={{ animationDelay: "0.15s" }}>
          a CSE undergrad from SVNIT.
        </span>
        <br />
      </h1>

      <p
  className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed max-w-md worddrop"
  style={{ animationDelay: "0.45s" }}
>
        Your small description text will go here. This is placeholder text.
      </p>

      <div className="flex gap-4 pt-4">
        <button className="btn worddrop" style={{ animationDelay: "0.6s" }}>
          View Projects
        </button>
        <button className="btn worddrop" style={{ animationDelay: "0.75s" }}>
          Contact Me
        </button>
      </div>
    </div>
  )}
</div>

{/* HERO IMAGE WRAPPER */}
<div className={`
  absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none
  transition-all duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)]
  ${shiftImage ? "translate-x-[240px]" : ""}
`}>

  {/* Glow Border */}
  <div className={`
    absolute inset-0
    rounded-[999px]
    pointer-events-none
    transition-all duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)]
    ${shiftImage ? "scale-[0.98]" : "scale-100"}
    glow-border
  `}></div>

  {/* Actual Image */}
  <img
  src="/sid.png"
  alt="Siddharth"
  className={`
    relative z-10
    shape-glow shape-glow-animate
    transition-all duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)]
    ${shiftImage ? "h-[82vh] scale-[0.98]" : "h-[90vh] scale-100"}
  `}
  style={{ transformOrigin: "bottom center" }}
/>
</div>



      {/* HELLOOOOOO PASSING BEHIND */}
      {showHello && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <span className="hellosweep">
            HEEEELLLLLLOOOOOOO
          </span>
        </div>
      )}

    </section>
    
  );
}
