import { profile } from "../content/profile";
import { AboutLandscape } from "./LandscapeSVG";
import Reveal from "./Reveal";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import aboutLandscape from "../../gallery/download (1).jpg";

export default function AboutSection() {
  const { scrollYProgress } = useScroll();
  const imageY = useSpring(useTransform(scrollYProgress, [0.12, 0.42], [-30, 35]), { stiffness: 70, damping: 22 });
  const titleX = useTransform(scrollYProgress, [0.12, 0.4], [0, 18]);
  return (
    <section id="about" style={{ padding: 0 }}>
      {/* Full-bleed grid layout */}
      <div className="about-grid">
        {/* Visual side */}
        <div className="about-visual" aria-hidden="true">
          <motion.div className="about-art" style={{ y: imageY }}><img src={aboutLandscape} alt="Mountain landscape" /><AboutLandscape /></motion.div>
        </div>

        {/* Editorial content side */}
        <div className="about-content">
          <Reveal>
            <div className="section-label">
              <span className="section-label-num">01</span>
              WHO I AM
            </div>
          </Reveal>

          {/* Identity block */}
          <Reveal delay={80}>
            <div className="about-identity">
              <motion.h2 className="about-name" style={{ x: titleX }}>
                Audrey<br />
                <em>Faisal Riza</em>
              </motion.h2>

              {/* Stats row: Age / Location / Experience */}
              <div className="about-stats-row">
                <div className="about-stat">
                  <span className="about-stat-num">{profile.age}</span>
                  <span className="about-stat-label">Years Old</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">{profile.yearsExperience}</span>
                  <span className="about-stat-label">Years Building</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num" style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", lineHeight: 1.2 }}>
                    JAWA<br />TIMUR
                  </span>
                  <span className="about-stat-label">Indonesia</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={160}>
            <div className="about-bio">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* Metadata */}
          <Reveal delay={240}>
            <div className="about-meta-list">
              <div className="about-meta-row">
                <span className="about-meta-key">Based In</span>
                <span className="about-meta-val">{profile.location}</span>
              </div>
              <div className="about-meta-row">
                <span className="about-meta-key">Focus</span>
                <span className="about-meta-val">Fullstack · Bot Dev · Lua</span>
              </div>
              <div className="about-meta-row">
                <span className="about-meta-key">University</span>
                <span className="about-meta-val">Universitas Terbuka</span>
              </div>
              <div className="about-meta-row">
                <span className="about-meta-key">Discord</span>
                <span className="about-meta-val">{profile.discordHandle}</span>
              </div>
              <div className="about-meta-row">
                <span className="about-meta-key">Community</span>
                <span className="about-meta-val">
                  <a
                    href={profile.groups[0].inviteUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--accent-warm)", textDecoration: "none" }}
                  >
                    {profile.groups[0].name} ↗
                  </a>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
