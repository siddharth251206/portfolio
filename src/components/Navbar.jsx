import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // UPDATE ACTIVE NAV BASED ON SECTION VISIBILITY
      const sections = ["hero", "about", "skills", "projects", "contact"];
      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActive(sec);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`
        fixed top-6 left-1/2 -translate-x-1/2
        w-[88%] max-w-[1100px]
        flex items-center justify-between
        px-6 py-3
        rounded-3xl
        backdrop-blur-xl

        border border-[var(--card-border)]
        bg-[var(--card-bg)]
        shadow-[0_8px_30px_var(--shadow)]

        transition-all duration-500
        z-50 
        ${scrolled ? "py-2 shadow-[0_12px_45px_var(--shadow-strong)] scale-[0.985]" : ""}
      `}
    >
      {/* Logo */}
      <a href="#hero" className="font-semibold text-lg text-[hsl(var(--foreground))] tracking-wide">
        Siddharth
      </a>

      {/* NAV LINKS */}
      <div className="hidden md:flex gap-8 items-center font-medium text-[hsl(var(--foreground))]">

        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-cursor="pointer"
            className={`
              relative transition
              hover:text-[hsl(var(--accent))]
              ${active === item.id ? "text-[hsl(var(--accent))]" : ""}
            `}
          >
            {item.label}

            {/* Active underline */}
            {active === item.id && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[hsl(var(--accent))] rounded-full"></span>
            )}
          </a>
        ))}

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
            shadow-inner backdrop-blur-xl
            transition-all duration-300
            flex items-center
          "
        >
          <div
            className="
              absolute top-1 h-5 w-5 rounded-full
              bg-white dark:bg-[hsl(var(--accent))]
              shadow-md dark:shadow-[0_0_10px_hsl(var(--accent))]
              transition-all duration-300
            "
            style={{ left: "var(--toggle-knob-left)" }}
          />
        </div>
      </div>
    </nav>
  );
}
