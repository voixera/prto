import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../content/profile";
import { WEB_PROJECTS, DISCORD_PROJECT, ROBLOX_PROJECT, isExternalHref } from "../content/site";
import Reveal from "./Reveal";

function TiltProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        rotateY: x / 25,
        rotateX: -y / 25,
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
    <article ref={cardRef} className="project-card tilt-card">
      <div className="project-media">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} loading="lazy" />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: '#0f172a', color: '#64748b' }}>
            {project.title}
          </div>
        )}
      </div>

      <div className="project-info">
        <div>
          <span className="project-num">PROJECT {String(index + 1).padStart(2, '0')}</span>
          <h3 className="project-name">{project.title}</h3>
          <p className="project-desc">{project.description}</p>

          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>
        </div>

        {project.links?.[0] && (
          <a
            href={project.links[0].href}
            target={isExternalHref(project.links[0].href) ? "_blank" : undefined}
            rel={isExternalHref(project.links[0].href) ? "noreferrer" : undefined}
            className="btn btn-solid"
            style={{ width: 'fit-content', padding: '10px 20px', fontSize: '0.875rem' }}
          >
            {project.links[0].label} →
          </a>
        )}
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="section">
      <Reveal as="div" className="section-index-reveal" variant="fade" duration={400}>
        <div className="section-index">
          <span className="index-num">03</span>
          <span>SELECTED WORK</span>
        </div>
      </Reveal>

      <Reveal as="h2" className="section-title-reveal" variant="fade" duration={500} delay={100}>
        <h2 className="section-title">
          Featured Projects.
          <em>Web applications & tools.</em>
        </h2>
      </Reveal>

      <Reveal as="div" className="projects-list-reveal" variant="fade" duration={500} delay={200}>
        <div className="projects-list">
          {WEB_PROJECTS.map((project, index) => (
            <TiltProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Reveal>

      {DISCORD_PROJECT && (
        <Reveal as="div" className="discord-section-reveal" variant="fade" duration={500} delay={300}>
          <div style={{ marginTop: 64 }}>
            <div className="section-index">
              <span className="index-num">03.B</span>
              <span>BOT SYSTEMS</span>
            </div>
            <h3 className="section-title" style={{ fontSize: '2rem' }}>Discord Bots</h3>

            <div className="sub-showcase-grid">
              {profile.discordBots.map((bot) => (
                <div key={bot.name} className="sub-card">
                  <div>
                    <span className="project-num">{bot.category}</span>
                    <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: 8 }}>{bot.name}</h4>
                    <p className="project-desc" style={{ fontSize: '0.875rem' }}>{bot.description}</p>
                  </div>
                  <a
                    href={bot.inviteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-glass"
                    style={{ marginTop: 16, fontSize: '0.8125rem', padding: '8px 16px' }}
                  >
                    Invite Bot →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {ROBLOX_PROJECT && (
        <Reveal as="div" className="roblox-section-reveal" variant="fade" duration={500} delay={400}>
          <div style={{ marginTop: 64 }}>
            <div className="section-index">
              <span className="index-num">03.C</span>
              <span>AUTOMATION</span>
            </div>
            <h3 className="section-title" style={{ fontSize: '2rem' }}>Roblox Lua Scripts</h3>

            <div className="sub-showcase-grid">
              {profile.robloxScripts.slice(0, 4).map((script) => (
                <div key={script.name} className="sub-card">
                  <div>
                    <span className="project-num">{script.category}</span>
                    <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: 8 }}>{script.name}</h4>
                    <p className="project-desc" style={{ fontSize: '0.875rem' }}>{script.description}</p>
                  </div>
                  <a
                    href="#/roblox-scripts"
                    className="btn btn-glass"
                    style={{ marginTop: 16, fontSize: '0.8125rem', padding: '8px 16px' }}
                  >
                    View Showcase →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
