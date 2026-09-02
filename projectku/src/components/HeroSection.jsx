import { useEffect, useState } from "react";
import { profile } from "../content/profile";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { DiscordBrandIcon, LaunchArrow } from "./CustomIcons";

/**
 * HeroSection — Origin Financial style.
 * Atmospheric cloud-and-sky hero (no 3D). Centered whisper-weight
 * serif headline with first word italic, Inter subhead, white CTA.
 */
export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax offsets for cloud layers
  const farOffset = Math.min(scrollY * 0.04, 24);
  const nearOffset = Math.min(scrollY * 0.08, 48);

  return (
    <section id="home" className="hero">
      {/* Atmospheric cloud-and-sky backdrop */}
      <div className="hero-landscape" aria-hidden="true">
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMax slice"
          width="100%"
          height="100%"
        >
          <defs>
            {/* Sky atmosphere gradient — Origin spec */}
            <linearGradient id="heroSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(15, 16, 17)" />
              <stop offset="18%" stopColor="rgb(19, 29, 39)" />
              <stop offset="37%" stopColor="rgb(26, 71, 136)" opacity="0.5" />
              <stop offset="69%" stopColor="rgb(64, 138, 193)" opacity="0.35" />
              <stop offset="100%" stopColor="rgb(64, 138, 193)" opacity="0.2" />
            </linearGradient>
          </defs>

          {/* Sky wash */}
          <rect width="1440" height="800" fill="url(#heroSky)" />

          {/* Stars layer */}
          <g className="landscape-stars" opacity="0.5">
            {[
              [120, 60], [340, 95], [560, 40], [780, 110], [980, 55],
              [1150, 85], [1320, 50], [200, 140], [450, 120], [700, 70],
              [900, 135], [1080, 65], [1280, 115], [80, 180], [600, 160],
            ].map(([cx, cy], i) => (
              <circle
                key={`star-${i}`}
                className="landscape-star"
                cx={cx}
                cy={cy}
                r={i % 3 === 0 ? 1.2 : 0.7}
                fill="#f5f5f7"
                style={{ animationDelay: `${-i * 0.4}s` }}
              />
            ))}
          </g>

          {/* Drifting clouds — desaturated, atmospheric */}
          <g style={{ transform: `translateY(${farOffset}px)` }} opacity="0.08">
            <path
              className="landscape-cloud"
              d="M-100 220 Q-60 200 -20 215 T80 210 Q130 195 180 212 T300 205"
              stroke="#f5f5f7"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              className="landscape-cloud"
              d="M400 260 Q460 235 520 255 T660 245 Q730 228 800 252 T960 238"
              stroke="#f5f5f7"
              strokeWidth="1"
              fill="none"
            />
            <path
              className="landscape-cloud"
              d="M800 180 Q870 160 930 178 T1080 168 Q1140 152 1200 175 T1360 162"
              stroke="#f5f5f7"
              strokeWidth="0.8"
              fill="none"
            />
          </g>

          {/* Lower cloud band */}
          <g style={{ transform: `translateY(${nearOffset}px)` }} opacity="0.05">
            <path
              className="landscape-cloud"
              d="M-50 360 Q80 340 200 355 T440 350 Q560 335 680 352 T960 345 Q1080 330 1240 348 T1440 340"
              stroke="#f5f5f7"
              strokeWidth="1.5"
              fill="none"
            />
          </g>

          {/* Subtle horizon glow — Iris Gleam */}
          <circle cx="1036" cy="176" r="28" fill="rgba(132, 125, 255, 0.06)" />
          <circle cx="1036" cy="176" r="10" fill="rgba(132, 125, 255, 0.1)" />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="hero-copy">
        <Reveal>
          <p className="hero-name">Portfolio — 2026</p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display">
            <em>Audrey</em>
            <span>Faisal Riza.</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="lede">{profile.tagline}</p>
        </Reveal>

        <Reveal delay={200}>
          <div className="hero-actions">
            <MagneticButton strength={0.25}>
              <a className="btn btn-solid" href="#work" data-cursor-label="VIEW">
                View Projects
                <LaunchArrow size={15} />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <a
                className="btn btn-ghost"
                href={profile.discordInvite}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="OPEN"
              >
                Discord
                <DiscordBrandIcon size={15} />
              </a>
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <dl className="hero-meta">
            <div>
              <dt>Name</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Web · Bots · Lua</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      {/* Hero Stage — atmospheric signature mark (replaces 3D) */}
      <div className="hero-stage" aria-hidden="true">
        <svg
          className="hero-canvas"
          viewBox="0 0 480 480"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Concentric orbit rings — whisper-weight */}
          <circle cx="240" cy="240" r="210" stroke="rgba(245,245,247,0.08)" strokeWidth="1" />
          <circle cx="240" cy="240" r="160" stroke="rgba(245,245,247,0.12)" strokeWidth="1" />
          <circle cx="240" cy="240" r="110" stroke="rgba(245,245,247,0.16)" strokeWidth="1" />

          {/* Iris Gleam accent ring */}
          <circle
            cx="240"
            cy="240"
            r="64"
            stroke="rgba(132,125,255,0.55)"
            strokeWidth="1.5"
            fill="rgba(132,125,255,0.04)"
          />

          {/* Monoline mark — abstract AF (Audrey Faisal) initials */}
          <path
            d="M200 280 V200 Q200 176 224 176 Q248 176 248 200 V280 M200 240 H248"
            stroke="#f5f5f7"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M272 280 V200 Q272 176 296 176 M272 232 H300 Q316 232 316 216 Q316 200 300 200 H272 M296 200 Q316 200 316 224 V280"
            stroke="#f5f5f7"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Cyan signal data dots */}
          <circle cx="240" cy="30" r="2.5" fill="#00b3dd" />
          <circle cx="450" cy="240" r="2" fill="#00b3dd" opacity="0.7" />
          <circle cx="240" cy="450" r="2" fill="#00b3dd" opacity="0.5" />
          <circle cx="30" cy="240" r="2.5" fill="#00b3dd" />

          {/* Technical annotations */}
          <text
            x="48"
            y="52"
            fill="rgba(245,245,247,0.35)"
            fontSize="10"
            fontFamily="Roboto Mono, monospace"
            letterSpacing="2.6"
          >
            SIGNAL — LIVE
          </text>
          <text
            x="348"
            y="448"
            fill="rgba(245,245,247,0.25)"
            fontSize="9"
            fontFamily="Roboto Mono, monospace"
            letterSpacing="2"
          >
            {`LAT ${scrollY.toFixed(1)}`}
          </text>
        </svg>
        <p className="stage-caption">Atmospheric mark</p>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-line" />
        Scroll
      </div>
    </section>
  );
}
