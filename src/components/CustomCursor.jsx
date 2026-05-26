import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../cursor.css";

/**
 * CustomCursor — Liquid Glass lens cursor.
 *
 * Three layers:
 *   1. DOT   — 8px, zero-lag (mix-blend-mode:difference)
 *   2. RING  — 36px border, lerp trailing (mix-blend-mode:difference)
 *   3. GLASS — SVG distortion lens (backdrop-filter with displacement map)
 *
 * The glass distortion is purely CSS/SVG — no DOM cloning.
 * ONE universal hover effect. Click spawns a ripple.
 */

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glassRef = useRef(null);

  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const isMobile =
      window.innerWidth < 768 ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (isMobile || isAdmin) {
      document.documentElement.setAttribute("data-cursor-off", "");
      return;
    }
    document.documentElement.removeAttribute("data-cursor-off");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glass = glassRef.current;
    if (!dot || !ring || !glass) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let visible = false;
    let hovering = false;
    let rafId = null;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) visible = true;
    };

    const onHoverIn = () => {
      hovering = true;
      ring.classList.add("is-hovering");
      glass.classList.add("is-hovering");
      dot.classList.add("is-hovering");
    };
    const onHoverOut = () => {
      hovering = false;
      ring.classList.remove("is-hovering");
      glass.classList.remove("is-hovering");
      dot.classList.remove("is-hovering");
    };

    const onClick = (e) => {
      const ripple = document.createElement("div");
      ripple.className = "cursor-click-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };

    const onLeave = () => { visible = false; };
    const onEnter = () => { visible = true; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    // Hover binding
    const INTERACTIVE = "a, button, [role='button'], .btn, .hover-target, [data-cursor-hover], input, textarea, select, label[for], summary";
    const bind = (el) => {
      if (el.dataset._ch) return;
      el.dataset._ch = "1";
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    };
    const bindAll = () => document.querySelectorAll(INTERACTIVE).forEach(bind);
    bindAll();
    const observer = new MutationObserver(bindAll);
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop — spring-damper physics for oscillating ring
    const STIFFNESS = 0.12;  // pull strength toward target
    const DAMPING = 0.7;     // friction (< 1 = oscillates, closer to 1 = less bounce)
    let vx = 0, vy = 0;     // ring velocity

    const tick = () => {
      // Spring force: pull ring toward mouse, with overshoot & oscillation
      const dx = mx - rx;
      const dy = my - ry;
      vx += dx * STIFFNESS;
      vy += dy * STIFFNESS;
      vx *= DAMPING;
      vy *= DAMPING;
      rx += vx;
      ry += vy;

      const o = visible ? 1 : 0;
      const size = hovering ? 56 : 36;
      const half = size / 2;

      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      dot.style.opacity = o;

      const pos = `translate3d(${rx - half}px, ${ry - half}px, 0)`;
      ring.style.transform = pos;
      ring.style.opacity = o;
      glass.style.transform = pos;
      glass.style.opacity = o;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
      document.documentElement.removeAttribute("data-cursor-off");
    };
  }, [isAdmin]);

  if (isAdmin) return null;

  return (
    <>
      {/* Inline SVG filters for the glass distortion effect */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {/* Default state — subtle glass distortion */}
          <filter id="liquid-glass-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.02"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Hover state — stronger distortion */}
          <filter id="liquid-glass-filter-hover">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.015"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="cursor-glass" ref={glassRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
    </>
  );
}