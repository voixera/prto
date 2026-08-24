import { profile } from "../content/profile";
import Reveal from "./Reveal";

export default function JourneySection() {
  return (
    <section id="journey" className="section journey">
      <div className="section-index">
        <span className="index-num">04</span>
        <span>Journey</span>
      </div>

      <div className="section-body">
        <Reveal>
          <h2 className="section-title">
            Selected work
            <em>through the years.</em>
          </h2>
        </Reveal>

        {/* Experience Timeline */}
        <ol className="timeline">
          {profile.experience.map((item, index) => (
            <Reveal key={item.title} delay={index * 80} as="li" className="timeline-item">
              <p className="year">{item.period}</p>
              <div>
                <div className="role-head">
                  {item.logo ? <img src={item.logo} alt={`${item.title} logo`} /> : null}
                  <h3>{item.title}</h3>
                </div>
                <p className="role">{item.subtitle}</p>
                {item.details ? <p className="muted">{item.details}</p> : null}
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Education / Learning Journey */}
        <ol className="edu-list">
          {profile.education.map((item) => (
            <li key={item.title}>
              <span>{item.period}</span>
              <strong>{item.title}</strong>
              <p>{item.subtitle}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
