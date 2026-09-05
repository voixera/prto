import { profile } from "../content/profile";
import Reveal from "./Reveal";
export default function JourneySection() {
  return (
    <section id="journey" className="section">
      <div className="section-index">
        <span>JOURNEY</span>
      </div>

      <h2 className="section-title">
        Experience & Roles.
        <em>Community & Development work.</em>
      </h2>

      <div className="journey-timeline">
        {profile.experience.map((item) => (
          <Reveal key={item.title} delay={100} variant="clip" duration={600} className="journey-item-reveal">
            <div className="journey-item">
              <span className="journey-period">{item.period}</span>
              <div className="journey-header" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                {item.logo && (
                  <img src={item.logo} alt={item.title} className="journey-logo" />
                )}
                <h3 className="journey-role">{item.title} — {item.subtitle}</h3>
              </div>
              <p className="project-desc journey-details">{item.details}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="journey-education">
        <h3 className="journey-subtitle">Education &amp; Self-Learning</h3>
        <div className="education-grid">
          {profile.education.map((item) => (
            <Reveal key={item.title} delay={100} className="education-item-reveal">
              <div className="education-item">
                <span className="project-num">{item.period}</span>
                <h4 className="education-title">{item.title}</h4>
                <p className="project-desc education-subtitle">{item.subtitle}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
