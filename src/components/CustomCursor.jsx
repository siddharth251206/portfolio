import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../cursor.css";

/**
 * CustomCursor — dead-simple, rock-solid, no-glitch cursor.
 *
 * Two layers:
 *   1. DOT  — 6px, follows mouse with ZERO lag
 *   2. RING — 36px, trails behind via lerp
 *
 * ONE universal hover effect on all interactive elements.
 * Click spawns a ripple. That's it. No state machine.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    // ── Mobile / touch / admin → bail ──
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
    if (!dot || !ring) return;

    // ── State (no React renders) ──
    let mx = -100, my = -100;   // mouse position
    let rx = -100, ry = -100;   // ring position (lerped)
    let visible = false;
    let hovering = false;
    let rafId = null;

    const lerp = (a, b, t) => a + (b - a) * t;

    // ── Mouse tracking ──
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) visible = true;
    };

    // ── Hover — one universal effect ──
    const onHoverIn = () => {
      hovering = true;
      ring.classList.add("is-hovering");
      dot.classList.add("is-hovering");
    };

    const onHoverOut = () => {
      hovering = false;
      ring.classList.remove("is-hovering");
      dot.classList.remove("is-hovering");
    };

    // ── Click ripple ──
    const onClick = (e) => {
      const ripple = document.createElement("div");
      ripple.className = "cursor-click-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };

    // ── Visibility ──
    const onLeave = () => { visible = false; };
    const onEnter = () => { visible = true; };

    // ── Bind events ──
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    // ── Hover binding ──
    const INTERACTIVE = "a, button, [role='button'], .btn, .hover-target, .card, .project-card, [data-cursor-hover], input, textarea, select, label[for], summary";

    const bind = (el) => {
      if (el.dataset._ch) return;
      el.dataset._ch = "1";
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    };

    const bindAll = () => {
      document.querySelectorAll(INTERACTIVE).forEach(bind);
    };

    bindAll();

    // Re-bind on DOM changes (route transitions, dynamic content)
    const observer = new MutationObserver(bindAll);
    observer.observe(document.body, { childList: true, subtree: true });

    // ── rAF loop ──
    const tick = () => {
      // Lerp ring toward mouse
      rx = lerp(rx, mx, 0.14);
      ry = lerp(ry, my, 0.14);

      const o = visible ? 1 : 0;

      // Dot — exact position, zero lag
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      dot.style.opacity = o;

      // Ring — trailing position
      // Offset by half the CURRENT size (CSS transitions the size)
      const ringSize = hovering ? 56 : 36;
      const half = ringSize / 2;
      ring.style.transform = `translate3d(${rx - half}px, ${ry - half}px, 0)`;
      ring.style.opacity = o;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // ── Cleanup ──
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
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
    </>
  );
}