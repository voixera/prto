import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../content/profile";
import { ABOUT_META } from "../content/site";

export default function AboutSection() {
  const group = profile.groups?.[0];
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        rotateY: x / 20,
        rotateX: -y / 20,
        ease: "power2.out",
        duration: 0.4
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        ease: "power2.out",
        duration: 0.6
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="about" className="section">
      <div className="section-index">
        <span className="index-num">01</span>
        <span>ABOUT</span>
      </div>

      <h2 className="section-title">
        Building digital tools.
        <em>Driven by UX and execution.</em>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginTop: 40 }}>
        <div>
          <div className="about-copy">
            {profile.about.map((paragraph, i) => (
              <p key={i} className="lede" style={{ marginBottom: 20 }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 32 }}>
            {ABOUT_META.map((item) => (
              <div key={item.label} className="hero-meta-item">
                <label>{item.label}</label>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {group && (
          <div
            ref={cardRef}
            className="tilt-card"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              backdropFilter: 'blur(16px)'
            }}
          >
            <div>
              <span className="hero-badge" style={{ marginBottom: 16 }}>{group.affiliation}</span>
              <h3 className="section-title" style={{ fontSize: '1.75rem', marginBottom: 12 }}>{group.name}</h3>
              <p className="project-desc">{group.summary}</p>
            </div>

            <a
              href={group.inviteUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-glass"
              style={{ marginTop: 24, width: 'fit-content' }}
            >
              JOIN COMMUNITY ({group.inviteLabel})
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
