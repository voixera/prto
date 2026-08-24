import { useCallback, useEffect, useRef, useState } from "react";
import BrandMark from "../components/BrandMark";

const TOTAL_STEPS = 100;
const TICK_MS = 16;
const EXIT_MS = 700;

export default function WelcomeScreen({ entered = false, onEnter }) {
  const didEnterRef = useRef(false);
  const exitTimerRef = useRef(0);
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
    onEnter?.();
    exitTimerRef.current = window.setTimeout(() => setIsGone(true), EXIT_MS);
  }, [isExiting, onEnter, progress]);

  useEffect(() => {
    if (entered || isExiting || progress < TOTAL_STEPS) return;
    const handler = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        requestEnter();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [entered, isExiting, progress, requestEnter]);

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
      className={`screen-loader ${progress >= TOTAL_STEPS ? "is-ready" : ""} ${isExiting ? "is-exiting" : ""}`}
      aria-label="Loading portfolio"
    >
      {/* Background frame decoration */}
      <svg className="loader-frame" viewBox="0 0 200 200" aria-hidden="true">
        <rect x="10" y="10" width="180" height="180" />
        <line x1="10" y1="60" x2="190" y2="60" />
        <line x1="10" y1="140" x2="190" y2="140" />
        <line x1="60" y1="10" x2="60" y2="190" />
        <line x1="140" y1="10" x2="140" y2="190" />
        <circle cx="100" cy="100" r="40" />
      </svg>

      {/* Main loader content */}
      <div className="loader-content">
        <BrandMark size={36} />
        <p className="kicker">PORTOAZURE48</p>
        <h2>Preparing the workspace.</h2>
        
        <div className="loader-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={TOTAL_STEPS}>
          <span style={{ width: `${progress}%` }} />
        </div>

        <p className="loader-count">{String(progress).padStart(3, "0")}</p>

        {progress >= TOTAL_STEPS ? (
          <button type="button" className="btn btn-solid" onClick={requestEnter} autoFocus>
            Enter
          </button>
        ) : (
          <p className="loader-hint">Loading assets...</p>
        )}
      </div>
    </div>
  );
}
