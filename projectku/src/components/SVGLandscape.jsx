import { useEffect, useRef, useState } from "react";

/**
 * SVGLandscape — Animated layered environment
 * Mountains, horizon, clouds, stars, atmospheric grid
 * Parallax-aware, scroll-reactive
 */
export default function SVGLandscape({ scrollY = 0 }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ w: 1440, h: 800 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 10 && height > 10) {
          setDimensions({ w: width, h: height });
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { w, h } = dimensions;
  
  // Parallax offsets based on scroll
  const farOffset = Math.min(scrollY * 0.03, 20);
  const midOffset = Math.min(scrollY * 0.06, 40);
  const nearOffset = Math.min(scrollY * 0.1, 60);

  // ViewBox for responsive SVG
  const vbW = 1440;
  const vbH = 800;
  const skyGradientId = "skyGrad";
  const mountainFarId = "mtnFar";
  const mountainMidId = "mtnMid";
  const mountainNearId = "mtnNear";
  const horizonGlowId = "hzGlow";

  return (
    <div className="hero-landscape" ref={containerRef} aria-hidden="true">
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMax slice"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id={skyGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#080a0d" />
            <stop offset="45%" stopColor="#0c1015" />
            <stop offset="75%" stopColor="#111620" />
            <stop offset="100%" stopColor="#161e2a" />
          </linearGradient>

          {/* Mountain gradients */}
          <linearGradient id={mountainFarId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1f28" />
            <stop offset="100%" stopColor="#12161d" />
          </linearGradient>

          <linearGradient id={mountainMidId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#141820" />
            <stop offset="100%" stopColor="#0e1117" />
          </linearGradient>

          <linearGradient id={mountainNearId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f1319" />
            <stop offset="100%" stopColor="#090c10" />
          </linearGradient>

          {/* Horizon glow */}
          <radialGradient id={horizonGlowId} cx="50%" cy="85%" r="50%">
            <stop offset="0%" stopColor="rgba(201, 168, 124, 0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Sky background */}
        <rect width={vbW} height={vbH} fill={`url(#${skyGradientId})`} />

        {/* Stars layer */}
        <g className="landscape-stars" opacity="0.5">
          {[
            [120, 60], [340, 95], [560, 40], [780, 110], [980, 55],
            [1150, 85], [1320, 50], [200, 140], [450, 120], [700, 70],
            [900, 135], [1080, 65], [1280, 115], [80, 180], [600, 160]
          ].map(([cx, cy], i) => (
            <circle
              key={`star-${i}`}
              className="landscape-star"
              cx={cx}
              cy={cy}
              r={i % 3 === 0 ? 1.2 : 0.8}
              fill="#e8e6e3"
              style={{ animationDelay: `${-i * 0.4}s` }}
            />
          ))}
        </g>

        {/* Clouds — drifting slowly */}
        <g opacity="0.06">
          <path
            className="landscape-cloud"
            d="M-100 180 Q-60 160 -20 175 T80 170 Q130 155 180 172 T300 165"
            stroke="#e8e6e3"
            strokeWidth="1"
            fill="none"
          />
          <path
            className="landscape-cloud"
            d="M400 220 Q460 195 520 215 T660 205 Q730 188 800 212 T960 198"
            stroke="#e8e6e3"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            className="landscape-cloud"
            d="M800 150 Q870 130 930 148 T1080 138 Q1140 122 1200 145 T1360 132"
            stroke="#e8e6e3"
            strokeWidth="0.6"
            fill="none"
          />
        </g>

        {/* Distant mountains — slowest parallax */}
        <g
          className="landscape-layer"
          style={{ transform: `translateY(${farOffset}px)` }}
        >
          <path
            d={`M0 ${vbH} L0 480 Q100 420 200 455 T400 430 Q520 385 640 420 T880 395 Q1000 355 1120 400 T${vbW} 380 L${vbW} ${vbH} Z`}
            fill={`url(#${mountainFarId})`}
            opacity="0.7"
          />
        </g>

        {/* Mid mountains — medium parallax */}
        <g
          className="landscape-layer"
          style={{ transform: `translateY(${midOffset}px)` }}
        >
          <path
            d={`M0 ${vbH} L0 540 Q80 485 180 520 T360 495 Q480 445 600 490 T840 460 Q960 420 1080 475 T${vbW} 450 L${vbH} Z`}
            fill={`url(#${mountainMidId})`}
            opacity="0.85"
          />
        </g>

        {/* Near terrain — fastest parallax */}
        <g
          className="landscape-layer"
          style={{ transform: `translateY(${nearOffset}px)` }}
        >
          <path
            d={`M0 ${vbH} L0 600 Q120 560 240 585 T480 565 Q620 530 760 572 T1080 550 Q1260 520 ${vbW} 560 L${vbW} ${vbH} Z`}
            fill={`url(#${mountainNearId})`}
          />
        </g>

        {/* Horizon line with glow */}
        <rect
          x="0"
          y={vbH - 2}
          width={vbW}
          height="2"
          fill={`url(#${horizonGlowId})`}
        />
        <line
          x1="0"
          y1={vbH - 2}
          x2={vbW}
          y2={vbH - 2}
          stroke="rgba(201, 168, 124, 0.12)"
          strokeWidth="1"
        />

        {/* Atmospheric grid — subtle perspective lines */}
        <g opacity="0.04" stroke="#e8e6e3" strokeWidth="0.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`grid-h-${i}`}
              x1="0"
              y1={vbH - 200 + i * 18}
              x2={vbW}
              y2={vbH - 200 + i * 18}
              className="landscape-grid-line"
              style={{ animationDelay: `${-i * 0.5}s` }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`grid-v-${i}`}
              x1={i * (vbW / 19)}
              y1={vbH - 220}
              x2={i * (vbW / 19) + (i < 10 ? 40 : -40)}
              y2={vbH}
              className="landscape-grid-line"
              style={{ animationDelay: `${-i * 0.3}s` }}
            />
          ))}
        </g>

        {/* Sun/Moon — subtle glow point */}
        <circle
          cx={vbW * 0.72}
          cy={vbH * 0.22}
          r="24"
          fill="rgba(201, 168, 124, 0.04)"
        />
        <circle
          cx={vbW * 0.72}
          cy={vbH * 0.22}
          r="8"
          fill="rgba(201, 168, 124, 0.08)"
        />

        {/* Technical annotation labels */}
        <text
          x="48"
          y="52"
          fill="rgba(232, 230, 227, 0.18)"
          fontSize="11"
          fontFamily="DM Mono, monospace"
          letterSpacing="3"
        >
          ENVIRONMENT_01
        </text>
        <text
          x={vbW - 180}
          y={vbH - 32}
          fill="rgba(232, 230, 227, 0.12)"
          fontSize="10"
          fontFamily="DM Mono, monospace"
          letterSpacing="2"
        >
          LAT {scrollY.toFixed(1)}°
        </text>
      </svg>
    </div>
  );
}
