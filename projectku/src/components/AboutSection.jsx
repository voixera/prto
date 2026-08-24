import { profile } from "../content/profile";
import { ABOUT_META } from "../content/site";
import Reveal from "./Reveal";

export default function AboutSection() {
  const group = profile.groups?.[0];

  return (
    <section id="about" className="section about">
      <div className="section-index">
        <span>01</span>
        <span>About</span>
      </div>

      <div className="section-body">
        <Reveal>
          <h2 className="section-title">
            Student by day.
            <em> Builder the rest of the time.</em>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="about-copy">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={140}>
          <dl className="meta-strip">
            {ABOUT_META.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        {group ? (
          <Reveal delay={180}>
            <aside className="group-note">
              <p className="kicker">{group.affiliation}</p>
              <h3>{group.name}</h3>
              <p>{group.summary}</p>
              <a href={group.inviteUrl} target="_blank" rel="noreferrer">
                {group.inviteLabel}
              </a>
            </aside>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
