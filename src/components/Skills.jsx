export default function Skills() {
  return (<section
  id="skills"
  className="relative py-32 px-6 md:px-12 text-[hsl(var(--foreground))]"
>
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
  {/* BACKGROUND SUBTLE ACCENTS */}
  <div className="absolute inset-0 pointer-events-none z-0">
    <div className="absolute w-72 h-72 bg-[hsl(var(--accent))/0.25] rounded-full blur-[120px] top-20 left-10"></div>
    <div className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-[150px] bottom-20 right-10"></div>
  </div>

  {/* HEADING */}
  <h2 className="relative text-5xl md:text-6xl font-extrabold text-center mb-20 worddrop">
    Skills
    <span className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-24 h-[3px] bg-[hsl(var(--accent))] rounded-full"></span>
  </h2>

  {/* 3 SKILL CARDS */}
  <div className="
    relative z-10
    grid grid-cols-1 md:grid-cols-3 gap-10
    max-w-6xl mx-auto
  ">

    {/* FRONTEND */}
    <div className="
      group p-10 rounded-3xl
      backdrop-blur-xl
      bg-white/40 dark:bg-white/10
      border border-white/30 dark:border-white/10
      shadow-xl shadow-black/20
      transition-all duration-300
      hover:scale-[1.04]
      hover:shadow-2xl hover:shadow-black/30
      relative overflow-hidden
    ">
      <div className="absolute -top-5 -right-5 text-[4rem] opacity-10 group-hover:opacity-20 transition-all">⚛️</div>
      <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--accent))]">Frontend</h3>
      <ul className="space-y-3 text-lg leading-relaxed">
        <li>React.js</li>
        <li>Next.js / Vite</li>
        <li>TailwindCSS</li>
        <li>JavaScript / TypeScript</li>
        <li>CSS Animations</li>
      </ul>
    </div>

    {/* BACKEND */}
    <div className="
      group p-10 rounded-3xl
      backdrop-blur-xl
      bg-white/40 dark:bg-white/10
      border border-white/30 dark:border-white/10
      shadow-xl shadow-black/20
      transition-all duration-300
      hover:scale-[1.04]
      hover:shadow-2xl hover:shadow-black/30
      relative overflow-hidden
    ">
      <div className="absolute -top-5 -right-5 text-[4rem] opacity-10 group-hover:opacity-20 transition-all">🛠️</div>
      <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--accent))]">Backend</h3>
      <ul className="space-y-3 text-lg leading-relaxed">
        <li>Node.js</li>
        <li>Express</li>
        <li>MongoDB</li>
        <li>SQL / PostgreSQL</li>
        <li>REST APIs</li>
      </ul>
    </div>

    {/* OTHER */}
    <div className="
      group p-10 rounded-3xl
      backdrop-blur-xl
      bg-white/40 dark:bg-white/10
      border border-white/30 dark:border-white/10
      shadow-xl shadow-black/20
      transition-all duration-300
      hover:scale-[1.04]
      hover:shadow-2xl hover:shadow-black/30
      relative overflow-hidden
    ">
      <div className="absolute -top-5 -right-5 text-[4rem] opacity-10 group-hover:opacity-20 transition-all">🚀</div>
      <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--accent))]">Other</h3>
      <ul className="space-y-3 text-lg leading-relaxed">
        <li>Git / GitHub</li>
        <li>Figma</li>
        <li>Linux</li>
        <li>Firebase</li>
        <li>Problem Solving</li>
      </ul>
    </div>

  </div>

</section>
);
}
