import { useEffect, useRef } from "react";

export default function HeroSignal({ pointer }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const x = (pointer?.x ?? 0) * 18;
    const y = (pointer?.y ?? 0) * 12;
    svg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, [pointer]);

  return (
    <svg
      ref={svgRef}
      className="hero-signal"
      viewBox="0 0 640 640"
      fill="none"
      aria-hidden="true"
    >
      <g className="signal-grid" stroke="currentColor" strokeOpacity="0.12">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={80 * i} y1="0" x2={80 * i} y2="640" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={80 * i} x2="640" y2={80 * i} />
        ))}
      </g>
      <path
        className="signal-draw"
        d="M48 420C120 360 168 240 248 220C328 200 352 320 432 340C512 360 560 250 592 180"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        className="signal-draw delay"
        d="M72 520C160 500 210 430 290 438C370 446 390 540 470 548C534 554 568 500 600 470"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.55"
      />
      <circle className="signal-node" cx="248" cy="220" r="4" fill="currentColor" />
      <circle className="signal-node" cx="432" cy="340" r="3" fill="currentColor" />
      <circle className="signal-node" cx="290" cy="438" r="3.5" fill="currentColor" />
      <text x="40" y="44" fill="currentColor" opacity="0.45" fontSize="11" fontFamily="DM Mono, monospace">
        WEB / BOT / LUA
      </text>
      <text x="470" y="612" fill="currentColor" opacity="0.35" fontSize="11" fontFamily="DM Mono, monospace">
        07.12 — LIVE
      </text>
    </svg>
  );
}
