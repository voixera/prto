import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

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

    const update = (time) => lenis.raf(time * 1000);
    const refresh = () => ScrollTrigger.update();
    lenis.on("scroll", refresh);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      lenis.off("scroll", refresh);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [enabled]);

  return <>{children}</>;
}
