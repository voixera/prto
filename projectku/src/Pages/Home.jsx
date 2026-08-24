import { profile } from "../content/profile";

const nav = [
  ["About", "about"],
  ["Work", "portfolio"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

function initials(name) {
  return name.split(" ").map((part) => part[0]).slice(-2).join("");
}

export default function Home() {
  const projects = profile.projects.slice(0, 4);

  return (
    <div className="folio-redesign">
      <header className="folio-header">
        <a className="folio-mark" href="#home" aria-label="Home">{initials(profile.name)}</a>
        <nav className="folio-nav" aria-label="Main navigation">
          {nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <a className="folio-availability" href="mailto:rizafaisal173@gmail.com"><span /> Available for work</a>
      </header>

      <main>
        <section className="folio-hero" id="home">
          <div className="folio-hero-copy">
            <p className="folio-kicker">Independent developer / East Java, Indonesia</p>
            <h1>Useful digital<br /><em>things,</em> made well.</h1>
            <p className="folio-lede">{profile.tagline}</p>
            <div className="folio-actions">
              <a className="folio-button" href="#portfolio">Selected work <b aria-hidden="true">↓</b></a>
              <a className="folio-text-link" href="mailto:rizafaisal173@gmail.com">Start conversation <b aria-hidden="true">↗</b></a>
            </div>
          </div>
          <aside className="folio-intro-card">
            <div className="folio-monogram">{initials(profile.name)}</div>
            <p>Currently building across web, communities, and games.</p>
            <dl>
              <div><dt>Focus</dt><dd>Full stack</dd></div>
              <div><dt>Since</dt><dd>2020</dd></div>
            </dl>
          </aside>
        </section>

        <section className="folio-section folio-about" id="about">
          <p className="folio-index">01 / About</p>
          <div>
            <h2>Curious by nature.<br />Practical by default.</h2>
            <p className="folio-body">{profile.about.join(" ")}</p>
            <div className="folio-facts">
              <p><strong>{profile.yearsExperience}+</strong> years learning by building</p>
              <p><strong>{profile.skills.length}</strong> tools in active rotation</p>
              <p><strong>Indonesia</strong> working worldwide</p>
            </div>
          </div>
        </section>

        <section className="folio-section folio-work" id="portfolio">
          <div className="folio-section-top"><p className="folio-index">02 / Selected work</p><p>Small teams, clear goals, useful outcomes.</p></div>
          <div className="folio-project-grid">
            {projects.map((project, index) => {
              const link = project.links?.[0];
              return <article className="folio-project" key={project.title}>
                <a className="folio-project-image" href={link?.href} target={link?.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {project.thumbnail ? <img src={project.thumbnail} alt={`${project.title} preview`} loading={index > 1 ? "lazy" : "eager"} /> : <span>{project.title}</span>}
                </a>
                <div className="folio-project-info">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div>{project.tags.slice(0, 3).map((tag) => <small key={tag}>{tag}</small>)}</div>
                  {link && <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{link.label} <b aria-hidden="true">↗</b></a>}
                </div>
              </article>;
            })}
          </div>
        </section>

        <section className="folio-section folio-skills" id="skills">
          <p className="folio-index">03 / Toolbox</p>
          <div><h2>Tools follow task.<br />Not other way round.</h2><ul>{profile.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>
        </section>

        <section className="folio-contact" id="contact">
          <p className="folio-index">04 / Contact</p>
          <h2>Have work worth<br /><em>making?</em></h2>
          <a href="mailto:rizafaisal173@gmail.com">rizafaisal173@gmail.com <b aria-hidden="true">↗</b></a>
          <div>{profile.socials.slice(0, 3).map((social) => <a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{social.label}</a>)}</div>
        </section>
      </main>
      <footer className="folio-footer"><span>{profile.name}</span><span>© {new Date().getFullYear()}</span></footer>
    </div>
  );
}
