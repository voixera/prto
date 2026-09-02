import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../content/profile";
import { HeroLandscape } from "./LandscapeSVG";
import Reveal from "./Reveal";

export default function HeroSection() {
  const wrapRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for hero elements
      gsap.from(".hero-anim-el", {
        y: 36,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });

      // Mouse parallax on the landscape
      const handleMouseMove = (e) => {
        const xPct = (e.clientX / window.innerWidth - 0.5);
        const yPct = (e.clientY / window.innerHeight - 0.5);
        if (parallaxRef.current) {
          gsap.to(parallaxRef.current, {
            x: xPct * 24,
            y: yPct * 16,
            duration: 1.4,
            ease: "power2.out",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const nameParts = profile.name.split(" ");
  const firstName = nameParts[0]; // Audrey
  const lastName = nameParts.slice(1).join(" "); // Faisal Riza

  return (
    <section ref={wrapRef} id="home" className="hero-wrapper">
      {/* Left: editorial content */}
      <div className="hero-content">
        {/* Availability */}
        <div className="hero-availability hero-anim-el">
          <span className="hero-availability-dot" aria-hidden="true" />
          AVAILABLE FOR PROJECTS
        </div>

        {/* Name — massive display type */}
        <div aria-label={profile.name}>
          <span className="hero-name hero-anim-el">
            <span className="hero-name-first">{firstName.toUpperCase()}</span>
            <span className="hero-name-last">{lastName}</span>
          </span>
        </div>

        <div className="hero-divider hero-anim-el" aria-hidden="true" />

        {/* Role + tagline */}
        <p className="hero-role hero-anim-el">
          {profile.role}
        </p>

        <p className="hero-tagline hero-anim-el">
          {profile.tagline}
        </p>

        {/* CTA */}
        <div className="hero-anim-el" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <a
            href="#work"
            className="btn btn-outline"
            data-cursor-label="EXPLORE"
          >
            Selected Work
            <span style={{ width: 16, height: 1, background: "currentColor", display: "inline-block" }} aria-hidden="true" />
          </a>
          <a
            href={profile.discordInvite}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            data-cursor-label="DISCORD"
          >
            {profile.discordHandle}
          </a>
        </div>

        {/* Metadata strip */}
        <div className="hero-meta-strip hero-anim-el">
          <div className="hero-meta-item">
            <span className="hero-meta-label">Location</span>
            <span className="hero-meta-value">{profile.location}</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Age</span>
            <span className="hero-meta-value">{profile.age}</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Experience</span>
            <span className="hero-meta-value">{profile.yearsExperience} Years</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Status</span>
            <span className="hero-meta-value">UT Student</span>
          </div>
        </div>
      </div>

      {/* Right: cinematic landscape */}
      <div className="hero-visual" aria-hidden="true">
        <div ref={parallaxRef} style={{ position: "absolute", inset: "-5%", width: "110%", height: "110%" }}>
          <HeroLandscape style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Coordinate decoration */}
        <span className="hero-coord">
          07°15'S / 112°44'E<br />
          JAWA TIMUR
        </span>
      </div>

      {/* Scroll cue — centered below */}
      <div
        className="hero-scroll-cue"
        aria-hidden="true"
        style={{ gridColumn: "1 / -1" }}
      >
        <span className="hero-scroll-line" />
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.5rem",
          letterSpacing: "0.25em",
          color: "var(--text-dim)",
          textTransform: "uppercase",
          marginTop: 8,
        }}>
          SCROLL
        </span>
      </div>
    </section>
  );
}
