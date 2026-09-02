import { profile } from "../content/profile";

export default function JourneySection() {
  return (
    <section id="journey" className="section">
      <div className="section-index">
        <span className="index-num">04</span>
        <span>JOURNEY</span>
      </div>

      <h2 className="section-title">
        Experience & Roles.
        <em>Community & Development work.</em>
      </h2>

      <div className="journey-timeline">
        {profile.experience.map((item) => (
          <div key={item.title} className="journey-item">
            <span className="journey-period">{item.period}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              {item.logo && (
                <img src={item.logo} alt={item.title} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />
              )}
              <h3 className="journey-role">{item.title} — {item.subtitle}</h3>
            </div>
            <p className="project-desc" style={{ fontSize: '0.9375rem' }}>{item.details}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 64 }}>
        <h3 className="section-title" style={{ fontSize: '1.75rem' }}>Education & Self-Learning</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 24 }}>
          {profile.education.map((item) => (
            <div key={item.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '24px' }}>
              <span className="project-num">{item.period}</span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', margin: '8px 0 4px' }}>{item.title}</h4>
              <p className="project-desc" style={{ fontSize: '0.875rem' }}>{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
