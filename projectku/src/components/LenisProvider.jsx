import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function LenisProvider({ children, enabled = true }) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      anchors: true,
      infinite: false,
    });

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled]);

  return <>{children}</>;
}
