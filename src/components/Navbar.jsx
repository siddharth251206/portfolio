import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`
          fixed top-3 sm:top-6 left-1/2 -translate-x-1/2
          w-[95%] sm:w-[88%] max-w-[1100px]
          flex items-center justify-between
          px-4 sm:px-6 py-2.5 sm:py-3
          rounded-2xl sm:rounded-3xl
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
        <a 
          href="#hero" 
          className="font-logotext font-bold text-base sm:text-lg text-[hsl(var(--foreground))] tracking-wide"
        >
          Siddharth Sheth
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center font-medium text-[hsl(var(--foreground))]">

          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-cursor="pointer"
              className={`
                relative transition text-sm lg:text-base
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
              relative w-12 sm:w-14 h-6 sm:h-7 rounded-full cursor-pointer select-none
              bg-white/40 dark:bg-white/10
              border border-white/30 dark:border-white/20
              shadow-inner backdrop-blur-xl
              transition-all duration-300
              flex items-center
            "
          >
            <div
              className="
                absolute top-0.5 sm:top-1 h-4 sm:h-5 w-4 sm:w-5 rounded-full
                bg-white dark:bg-[hsl(var(--accent))]
                shadow-md dark:shadow-[0_0_10px_hsl(var(--accent))]
                transition-all duration-300
              "
              style={{ left: "var(--toggle-knob-left)" }}
            />
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-[hsl(var(--foreground))]" />
          ) : (
            <Menu size={24} className="text-[hsl(var(--foreground))]" />
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="
              fixed top-[60px] sm:top-[80px] left-1/2 -translate-x-1/2
              w-[95%] sm:w-[88%] max-w-[1100px]
              md:hidden
              backdrop-blur-xl
              bg-[var(--card-bg)]
              border border-[var(--card-border)]
              rounded-2xl
              shadow-[0_12px_45px_var(--shadow-strong)]
              z-40
              overflow-hidden
            "
          >
            <div className="flex flex-col p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    text-left px-4 py-3 rounded-lg
                    font-medium transition-all
                    ${active === item.id 
                      ? "text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10" 
                      : "text-[hsl(var(--foreground))] hover:bg-white/5"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}

              {/* MODE SWITCHER FOR MOBILE */}
              <div className="pt-2 px-4 flex items-center justify-between">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Theme</span>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}