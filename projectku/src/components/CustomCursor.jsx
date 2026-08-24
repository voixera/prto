import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

/**
 * CustomCursor — Refined cursor with contextual labels
 * - Normal: minimal dot + ring
 * - Hover (links, buttons): ring expands + shows label
 * - Project hover: shows "VIEW" / "OPEN" / "EXPLORE"
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const hover = window.matchMedia("(hover: hover)").matches;
    setEnabled(fine && hover && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let hovering = false;
    let currentLabel = "";
    let frame = 0;

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
    };

    const over = (event) => {
      const target = event.target.closest("a, button, [data-cursor]");
      hovering = Boolean(target);
      
      // Get custom label if available
      if (target) {
        currentLabel = target.getAttribute("data-cursor-label") || "";
      } else {
        currentLabel = "";
      }

      // Update label content and visibility
      if (label) {
        label.textContent = currentLabel;
        label.classList.toggle("is-visible", hovering && currentLabel.length > 0);
      }
    };

    const out = () => {
      hovering = false;
      currentLabel = "";
      if (label) {
        label.textContent = "";
        label.classList.remove("is-visible");
      }
    };

    const tick = () => {
      // Dot follows instantly
      if (dot) {
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Ring follows with lerp (smooth delay)
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;

      if (ring) {
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${hovering ? 1.9 : 1})`;
        ring.classList.toggle("is-hot", hovering);
      }

      // Label follows ring with slight offset
      if (label) {
        label.style.transform = `translate3d(${rx + 20}px, ${ry + 18}px, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add("has-custom-cursor");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerout", out, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <span className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <span className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <span className="cursor-label" ref={labelRef} aria-hidden="true" />
    </>
  );
}
