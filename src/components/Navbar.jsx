export default function Navbar() {
  return (
        <nav className="
        fixed top-6 left-1/2 -translate-x-1/2
        w-[88%] max-w-[1100px]
        flex items-center justify-between
        px-6 py-3 
        backdrop-blur-xl
        bg-white/60 dark:bg-white/10
        border border-white/30 dark:border-white/10
        rounded-3xl shadow-lg shadow-black/10
        z-50 nav-glow worddrop 
        flex!
        " style={{ animationDelay: "1.6s" }}>
      
      {/* Logo */}
      <h1 className="font-semibold text-lg text-[hsl(var(--foreground))]">
        Siddharth
      </h1>

      {/* Links */}
      <div className="flex gap-6 text-[hsl(var(--foreground))] font-medium">
        {/* MODE SWITCHER */}
<div 
  onClick={() => {
  const root = document.documentElement;
  root.classList.toggle("dark");
}}


  className="
    relative w-14 h-7 rounded-full cursor-pointer select-none
    bg-white/40 dark:bg-white/10
    border border-white/30 dark:border-white/20
    shadow-inner
    backdrop-blur-xl
    transition-all duration-300
    flex items-center px-1
  "
>
 <div
  className="
    absolute top-1
    h-5 w-5 rounded-full
    bg-white dark:bg-[hsl(var(--accent))]
    shadow-lg dark:shadow-[0_0_10px_hsl(var(--accent))]
    transition-all duration-300
  "
  style={{ left: "var(--toggle-knob-left)" }}
></div>


</div>

        <a href="#projects" className="hover:text-[hsl(var(--accent))] transition hover-target">Projects</a>
        <a href="#about" className="hover:text-[hsl(var(--accent))] transition hover-target">About</a>
        <a href="#contact" className="hover:text-[hsl(var(--accent))] transition hover-target">Contact</a>
      </div>
    </nav>
  );
}
