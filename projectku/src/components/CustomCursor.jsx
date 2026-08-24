import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
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
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let hovering = false;
    let frame = 0;

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
    };

    const over = (event) => {
      hovering = Boolean(event.target.closest("a, button, [data-cursor]"));
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot) dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring) {
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${hovering ? 1.8 : 1})`;
        ring.classList.toggle("is-hot", hovering);
      }
      frame = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add("has-custom-cursor");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <span className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <span className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
