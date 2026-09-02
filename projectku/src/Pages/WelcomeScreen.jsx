import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TOTAL_STEPS = 100;
const TICK_MS = 16;
const EXIT_MS = 700;

export default function WelcomeScreen({ entered = false, onEnter }) {
  const didEnterRef = useRef(false);
  const exitTimerRef = useRef(0);
  const loaderRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    didEnterRef.current = entered;
  }, [entered]);

  useEffect(() => {
    if (entered || isExiting || progress >= TOTAL_STEPS) return;
    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, TOTAL_STEPS));
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [entered, isExiting, progress]);

  const requestEnter = useCallback(() => {
    if (progress < TOTAL_STEPS || isExiting || didEnterRef.current) return;
    didEnterRef.current = true;
    setIsExiting(true);

    if (loaderRef.current) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
          setIsGone(true);
          onEnter?.();
        }
      });
    } else {
      onEnter?.();
      exitTimerRef.current = window.setTimeout(() => setIsGone(true), EXIT_MS);
    }
  }, [isExiting, onEnter, progress]);

  useEffect(() => {
    if (progress >= TOTAL_STEPS && !isExiting && !entered) {
      const auto = window.setTimeout(requestEnter, 350);
      return () => window.clearTimeout(auto);
    }
    return undefined;
  }, [progress, isExiting, entered, requestEnter]);

  useEffect(() => () => {
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
  }, []);

  if (isGone) return null;

  return (
    <div
      ref={loaderRef}
      className={`screen-loader ${progress >= TOTAL_STEPS ? "is-ready" : ""} ${isExiting ? "is-exiting" : ""}`}
      aria-label="Loading cinematic experience"
    >
      <div className="loader-content">
        <p className="loader-ticker">SYS // PORTOAZURE48 // ONLINE</p>
        <h2 className="loader-title">INITIALIZING ENVIRONMENT</h2>
        
        <div className="loader-progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={TOTAL_STEPS}>
          <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="loader-counter">{String(progress).padStart(3, "0")} %</p>

        {progress >= TOTAL_STEPS ? (
          <button type="button" className="btn btn-solid" style={{ marginTop: 24 }} onClick={requestEnter} autoFocus>
            ENTER ENVIRONMENT
          </button>
        ) : (
          <p className="loader-counter" style={{ marginTop: 12, fontSize: '0.75rem' }}>ESTABLISHING CONNECTION...</p>
        )}
      </div>
    </div>
  );
}
