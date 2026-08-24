import { useCallback, useEffect, useRef, useState } from "react";

const TOTAL_STEPS = 100;
const LOADING_TICK_MS = 22;
const EXIT_ANIMATION_MS = 750;

const BOOT_LOGS = [
  "SYS_INIT: Bootstrapping core modules...",
  "RESOLVE: Parsing vector coordinates & SVGs...",
  "GPU_ACCEL: Compiling interactive canvas shaders...",
  "AUDIO_BUS: Initializing spatial background frequency...",
  "SYNC: Fetching developer artifacts & repositories...",
  "SYSTEM_ONLINE: All systems operational.",
];

export default function WelcomeScreen({ entered = false, onEnter }) {
  const didEnterRef = useRef(false);
  const exitTimerRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    didEnterRef.current = entered;
  }, [entered]);

  useEffect(() => {
    if (entered || isExiting || progress >= TOTAL_STEPS) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 1, TOTAL_STEPS);
        const idx = Math.min(
          Math.floor((next / TOTAL_STEPS) * BOOT_LOGS.length),
          BOOT_LOGS.length - 1
        );
        setLogIndex(idx);
        return next;
      });
    }, LOADING_TICK_MS);
    return () => clearInterval(timer);
  }, [entered, isExiting, progress]);

  const requestEnter = useCallback(() => {
    if (progress < TOTAL_STEPS || isExiting || didEnterRef.current) return;
    didEnterRef.current = true;
    setIsExiting(true);
    onEnter?.();
    exitTimerRef.current = window.setTimeout(() => {
      setIsGone(true);
    }, EXIT_ANIMATION_MS);
  }, [isExiting, onEnter, progress]);

  useEffect(() => {
    if (progress < TOTAL_STEPS || isExiting || entered) return;
    const handler = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        requestEnter();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [entered, isExiting, progress, requestEnter]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  if (isGone) return null;

  return (
    <div
      className={`screen-loader ${progress >= TOTAL_STEPS ? "is-ready" : ""} ${
        isExiting ? "is-exiting" : ""
      }`}
      aria-label="System Loader"
    >
      {/* Background Cyber SVG Grids & Circles */}
      <svg className="loader-bg-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="loader-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(112, 186, 255, 0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="cyber-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(112, 186, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(119, 214, 178, 0.1)" />
          </linearGradient>
        </defs>

        <rect width="1000" height="1000" fill="url(#loader-glow)" />

        {/* Outer Rotating Radar Ring */}
        <g className="loader-radar-group">
          <circle cx="500" cy="500" r="380" fill="none" stroke="rgba(112, 186, 255, 0.08)" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="500" cy="500" r="320" fill="none" stroke="rgba(119, 214, 178, 0.1)" strokeWidth="1" strokeDasharray="14 10" />
          <circle cx="500" cy="500" r="240" fill="none" stroke="rgba(112, 186, 255, 0.15)" strokeWidth="1.5" strokeDasharray="40 180" />
        </g>

        {/* Orbiting Tech Nodes */}
        <g className="loader-orbit-group">
          <circle cx="500" cy="180" r="4" fill="#70baff" className="pulse-dot" />
          <circle cx="820" cy="500" r="3.5" fill="#77d6b2" className="pulse-dot" />
          <circle cx="500" cy="820" r="3" fill="#c7a6ff" className="pulse-dot" />
          <circle cx="180" cy="500" r="4" fill="#70baff" className="pulse-dot" />
        </g>

        {/* Diagonal Tech Crosshairs */}
        <line x1="150" y1="150" x2="250" y2="250" stroke="url(#cyber-line)" strokeWidth="1" />
        <line x1="850" y1="150" x2="750" y2="250" stroke="url(#cyber-line)" strokeWidth="1" />
        <line x1="150" y1="850" x2="250" y2="750" stroke="url(#cyber-line)" strokeWidth="1" />
        <line x1="850" y1="850" x2="750" y2="750" stroke="url(#cyber-line)" strokeWidth="1" />

        {/* Center Target Box */}
        <g className="loader-target-box" stroke="rgba(112, 186, 255, 0.35)" strokeWidth="1.5" fill="none">
          <path d="M 440 420 L 420 420 L 420 440" />
          <path d="M 560 420 L 580 420 L 580 440" />
          <path d="M 440 580 L 420 580 L 420 560" />
          <path d="M 560 580 L 580 580 L 580 560" />
        </g>
      </svg>

      <div className="loader-panel">
        {/* Monogram Hexagon Badge */}
        <div className="loader-badge-wrap">
          <svg className="loader-hexagon-svg" viewBox="0 0 100 115" width="84" height="96">
            <polygon
              points="50 1, 95 27, 95 78, 50 104, 5 78, 5 27"
              fill="rgba(12, 17, 24, 0.85)"
              stroke="rgba(112, 186, 255, 0.4)"
              strokeWidth="2"
              className="hex-bg"
            />
            <polygon
              points="50 8, 88 30, 88 74, 50 96, 12 74, 12 30"
              fill="none"
              stroke="rgba(119, 214, 178, 0.6)"
              strokeWidth="1.5"
              strokeDasharray="60 30"
              className="hex-glow-ring"
            />
            <text x="50" y="62" textAnchor="middle" fill="#edf3f7" fontSize="22" fontWeight="800" fontFamily="DM Mono, monospace" letterSpacing="-1px">
              FR<tspan fill="#70baff">.</tspan>
            </text>
          </svg>
        </div>

        <div className="loader-header">
          <div className="loader-tag">
            <span className="live-blink" />
            INITIALIZING WORKSPACE // 2026
          </div>
          <h2 className="loader-title">FAISAL RIZA</h2>
          <p className="loader-subtitle">FULLSTACK & SYSTEMS DEVELOPER</p>
        </div>

        {/* Progress Bar with Precision Indicators */}
        <div className="loader-bar-box">
          <div className="loader-bar-track">
            <div
              className="loader-bar-fill"
              style={{ width: `${progress}%` }}
            >
              <span className="loader-bar-glint" />
            </div>
          </div>
          <div className="loader-meta-row">
            <span className="loader-counter">
              <span className="loader-num">{progress.toString().padStart(3, "0")}</span>
              <span className="loader-pct">%</span>
            </span>
            <span className="loader-status-indicator">
              {progress < 100 ? "COMPILING" : "READY TO LAUNCH"}
            </span>
          </div>
        </div>

        {/* Terminal Boot Log */}
        <div className="loader-terminal-box">
          <div className="loader-term-head">
            <span>CONSOLE.OUT</span>
            <span>UTF-8 // ACTIVE</span>
          </div>
          <p className="loader-term-log">
            <span className="term-prompt">{">"}</span> {BOOT_LOGS[logIndex]}
          </p>
        </div>

        {/* Interaction Trigger */}
        <div className="loader-action-area">
          {progress >= TOTAL_STEPS ? (
            <button
              type="button"
              className="loader-launch-btn"
              onClick={requestEnter}
              autoFocus
            >
              <span>ACCESS INTERFACE</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          ) : (
            <div className="loader-wait-hint">PRESS [SPACE / ENTER] ON COMPLETION</div>
          )}
        </div>
      </div>
    </div>
  );
}
