import { useCallback, useEffect, useRef, useState } from "react";
import BrandMark from "../components/BrandMark";

const TOTAL_STEPS = 100;
const TICK_MS = 16;
const EXIT_MS = 620;

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
    if (progress < TOTAL_STEPS || isExiting || entered) return;
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
      const auto = window.setTimeout(requestEnter, 420);
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
      aria-label="Intro"
    >
      <svg className="loader-frame" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="4" y="4" width="92" height="92" />
        <path d="M4 18H96M4 82H96M18 4V96M82 4V96" />
      </svg>

      <div className="loader-panel">
        <BrandMark size={42} />
        <p className="kicker">Faisal Riza</p>
        <h2>Opening the work.</h2>
        <div className="loader-bar" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="loader-count">{String(progress).padStart(3, "0")}</p>
        {progress >= TOTAL_STEPS ? (
          <button type="button" className="btn btn-solid" onClick={requestEnter} autoFocus>
            Enter
          </button>
        ) : (
          <p className="loader-hint">Hold on</p>
        )}
      </div>
    </div>
  );
}
