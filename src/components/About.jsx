export default function About() {
  return (<section
  id="about"
  className="relative py-32 overflow-hidden text-[hsl(var(--foreground))]"
>

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0 z-0">
    <img 
      src="/about-bg.jpg"
      className="w-full h-full object-cover object-center opacity-70"
      alt=""
    />
    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-b 
      from-black/50 via-black/30 to-black/70"></div>
  </div>

  {/* FLOATING DECOR SHAPES */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute w-24 h-24 bg-[hsl(var(--accent))/0.3] blur-3xl rounded-full top-20 left-10 animate-pulse"></div>
    <div className="absolute w-32 h-32 bg-blue-500/20 blur-3xl rounded-full bottom-20 right-20 animate-pulse"></div>
  </div>

  {/* MAIN CONTENT */}
  <div className="relative z-10 max-w-5xl mx-auto px-6">

    {/* HEADING */}
    <h2 className="text-5xl md:text-6xl font-extrabold mb-16 text-center worddrop">
      About <span className="text-[hsl(var(--accent))]">Me</span>
    </h2>

    {/* GLASS CARD */}
    <div className="
      relative p-10 md:p-14
      rounded-3xl
      backdrop-blur-2xl
      bg-white/10 dark:bg-white/5
      border border-white/20 dark:border-white/10
      shadow-2xl shadow-black/40
      transform transition-all hover:scale-[1.02]
    ">

      {/* FLOATING TAGS */}
      <div className="absolute -top-6 left-6">
        <div className="px-5 py-2 rounded-full bg-white/20 
          border border-white/30 backdrop-blur-xl 
          text-sm font-semibold animate-bounce">
          CSE @ SVNIT
        </div>
      </div>

      <div className="absolute top-12 -right-6">
        <div className="px-5 py-2 rounded-full bg-white/20 
          border border-white/30 backdrop-blur-xl 
          text-sm font-semibold animate-floating">
          Developer
        </div>
      </div>

      <div className="absolute bottom-10 -left-10">
        <div className="px-5 py-2 rounded-full bg-white/20 
          border border-white/30 backdrop-blur-xl 
          text-sm font-semibold animate-floating-delayed">
          Designer
        </div>
      </div>
      {/* FLOATING TAGS */}

<div className="absolute -bottom-4 right-1/2 translate-x-1/2">
  <div className="px-5 py-2 rounded-full bg-white/20 
    border border-white/30 backdrop-blur-xl 
    text-sm font-semibold animate-floating">
    Tech Lover
  </div>
</div>

<div className="absolute top-1/3 -left-16">
  <div className="px-5 py-2 rounded-full bg-white/20 
    border border-white/30 backdrop-blur-xl 
    text-sm font-semibold animate-floating-delayed">
    Creative Engineer
  </div>
</div>

<div className="absolute bottom-1/3 -right-14">
  <div className="px-5 py-2 rounded-full bg-white/20 
    border border-white/30 backdrop-blur-xl 
    text-sm font-semibold animate-floating-slower">
    Learner
  </div>
</div>

      {/* BIO TEXT */}
      <div className="leading-relaxed text-xl space-y-6 worddrop">
        
        <p>
          I’m Siddharth — a Computer Science undergrad at SVNIT, 
          driven by design, creativity and the thrill of making ideas real.
        </p>

        <p>
          I love blending clean UI, smooth motion, and solid engineering 
          to craft digital experiences that feel effortless. 
          Whether I’m polishing a frontend interaction or optimizing backend logic, 
          I want everything I build to feel *intentional*.
        </p>

        <p>
          Beyond code, I’m a learner at heart — constantly exploring,
          experimenting, and pushing myself to design things that 
          not only work well, but look damn good while doing it.
        </p>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 pt-10">
        <button className="btn">View Projects</button>
        <button className="btn">Download Resume</button>
      </div>

    </div>

  </div>
</section>
  );
}
