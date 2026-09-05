import { motion } from "framer-motion";
import { profile } from "../content/profile";
import { HeroLandscape } from "./LandscapeSVG";

export default function HeroSection() {
  const nameParts = profile.name.split(" ");
  const firstName = nameParts[0]; // Audrey
  const lastName = nameParts.slice(1).join(" "); // Faisal Riza

  return (
    <section id="home" className="hero-wrapper">
      {/* Left: editorial content */}
      <div className="hero-content">
        {/* Availability */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }} className="hero-availability">
          <span className="hero-availability-dot" aria-hidden="true" />
          AVAILABLE FOR PROJECTS
        </motion.div>

        {/* Name — massive display type */}
        <div aria-label={profile.name}>
          <motion.span initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .8 }} className="hero-name">
            <span className="hero-name-first">{firstName.toUpperCase()}</span>
            <span className="hero-name-last">{lastName}</span>
          </motion.span>
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .65 }} className="hero-divider" aria-hidden="true" />

        {/* Role + tagline */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7 }} className="hero-role">
          {profile.role}
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .78 }} className="hero-tagline">
          {profile.tagline}
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .88 }} className="hero-actions">
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
        </motion.div>

        {/* Metadata strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="hero-meta-strip">
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
        </motion.div>
      </div>

      {/* Right: cinematic landscape */}
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-art">
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
