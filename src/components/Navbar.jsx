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
        <a href="#projects" className="hover:text-[hsl(var(--accent))] transition">Projects</a>
        <a href="#about" className="hover:text-[hsl(var(--accent))] transition">About</a>
        <a href="#contact" className="hover:text-[hsl(var(--accent))] transition">Contact</a>
      </div>
    </nav>
  );
}
