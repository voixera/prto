import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HeroLandscape } from "../components/LandscapeSVG";

const TOTAL = 100;
const TICK_MS = 14;

export default function WelcomeScreen({ entered = false, onEnter }) {
  const didEnterRef = useRef(false);
  const loaderRef = useRef(null);
  const nameFirstRef = useRef(null);
  const nameLastRef = useRef(null);
  const eyebrowRef = useRef(null);
  const barRef = useRef(null);
  const statusRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => { didEnterRef.current = entered; }, [entered]);

  // Progress ticker
  useEffect(() => {
    if (entered || isExiting || progress >= TOTAL) return;
    const timer = setInterval(() => {
      setProgress(p => Math.min(p + 1.5, TOTAL));
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [entered, isExiting, progress]);

  const requestEnter = useCallback(() => {
    if (progress < TOTAL || isExiting || didEnterRef.current) return;
    didEnterRef.current = true;
    setIsExiting(true);

    const el = loaderRef.current;
    if (!el) { onEnter?.(); return; }

    // Cinematic exit: clip from bottom up + fade
    gsap.to(el, {
      clipPath: "inset(100% 0 0 0)",
      duration: 1.1,
      ease: "power4.inOut",
      onComplete: () => {
        setIsGone(true);
        onEnter?.();
      }
    });
  }, [isExiting, onEnter, progress]);

  // Auto-enter after loading completes
  useEffect(() => {
    if (progress >= TOTAL && !isExiting && !entered) {
      const t = window.setTimeout(requestEnter, 600);
      return () => clearTimeout(t);
    }
  }, [progress, isExiting, entered, requestEnter]);

  if (isGone) return null;

  const pct = Math.round(progress);

  return (
    <div
      ref={loaderRef}
      className="screen-loader"
      style={{ clipPath: "inset(0% 0 0 0)" }}
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      {/* Cinematic landscape backdrop */}
      <div className="loader-landscape">
        <HeroLandscape />
      </div>

      {/* Content: bottom-left, editorial layout */}
      <div className="loader-content">
        <p ref={eyebrowRef} className="loader-eyebrow">
          ENTERING DIGITAL SPACE
        </p>

        <div style={{ overflow: "hidden" }}>
          <span ref={nameFirstRef} className="loader-name-first">
            AUDREY
          </span>
        </div>
        <div style={{ overflow: "hidden" }}>
          <span ref={nameLastRef} className="loader-name-last">
            Faisal
          </span>
        </div>

        <div
          ref={barRef}
          className="loader-bar-track"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading progress"
        >
          <div
            className="loader-bar-fill"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p ref={statusRef} className="loader-status">
          {pct < 100
            ? `${String(pct).padStart(3, "0")} — INITIALIZING`
            : "100 — READY"}
        </p>
      </div>
    </div>
  );
}
