import { useState, useEffect } from "react";
import { profile } from "../content/profile";
import Reveal from "./Reveal";
import Hero3DScene from "./Hero3DScene";
import SVGLandscape from "./SVGLandscape";
import MagneticButton from "./MagneticButton";
import { DiscordBrandIcon, LaunchArrow } from "./CustomIcons";

export default function HeroSection() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
    });
  };

  return (
    <section id="home" className="hero" onPointerMove={onMove}>
      {/* SVG Landscape Environment */}
      <SVGLandscape scrollY={scrollY} />

      {/* Hero Content */}
      <div className="hero-copy">
        <Reveal>
          <p className="hero-name">Portfolio — 2026</p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display">
            Audrey
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

      {/* Hero Stage — 3D Scene */}
      <div className="hero-stage">
        <Hero3DScene pointer={pointer} />
        <p className="stage-caption">Interactive scene</p>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-line" />
        Scroll
      </div>
    </section>
  );
}
