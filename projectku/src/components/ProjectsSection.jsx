import { profile } from "../content/profile";
import { WEB_PROJECTS, DISCORD_PROJECT, ROBLOX_PROJECT, isExternalHref } from "../content/site";
import Reveal from "./Reveal";
import { LaunchArrow } from "./CustomIcons";

/**
 * ProjectVisual — Individual project thumbnail with hover state
 */
function ProjectVisual({ project, index = 0 }) {
  return (
    <a
      className="case-visual"
      href={project.links?.[0]?.href ?? "#contact"}
      target={isExternalHref(project.links?.[0]?.href) ? "_blank" : undefined}
      rel={isExternalHref(project.links?.[0]?.href) ? "noreferrer" : undefined}
      data-cursor
      data-cursor-label="VIEW"
    >
      {project.thumbnail ? (
        <img
          src={project.thumbnail}
          alt={`${project.title} preview`}
          loading={index > 0 ? "lazy" : "eager"}
        />
      ) : (
        /* Fallback visual for projects without thumbnails */
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-surface)",
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            color: "var(--faint)",
            fontStyle: "italic",
          }}
        >
          {project.title.charAt(0)}
        </div>
      )}
      <span className="case-hover">
        View Project
        <LaunchArrow size={12} />
      </span>
    </a>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="section work">
      <div className="section-index">
        <span className="index-num">03</span>
        <span>Work</span>
      </div>

      <div className="section-body">
        <Reveal>
          <h2 className="section-title">
            Selected work.
            <em>Built with intent.</em>
          </h2>
        </Reveal>

        {/* Main project showcase */}
        <div className="case-list">
          {WEB_PROJECTS.map((project, index) => (
            <Reveal key={project.title} delay={index * 80}>
              <article className={`case-row ${index % 2 !== 0 ? "is-flip" : ""}`}>
                <ProjectVisual project={project} index={index} />
                <div className="case-copy">
                  <p className="case-num">Project {String(index + 1).padStart(2, "0")}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="tech-line">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {project.links?.[0] ? (
                    <a
                      className="text-link"
                      href={project.links[0].href}
                      target={isExternalHref(project.links[0].href) ? "_blank" : undefined}
                      rel={isExternalHref(project.links[0].href) ? "noreferrer" : undefined}
                    >
                      <span className="link-line" />
                      {project.links[0].label}
                      <LaunchArrow size={13} />
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Discord Bots section */}
        {DISCORD_PROJECT ? (
          <Reveal>
            <article className="band-case">
              <div>
                <p className="kicker">Discord Systems</p>
                <h3>{DISCORD_PROJECT.title}</h3>
                <p>{DISCORD_PROJECT.description}</p>
                <a className="text-link" href="#/discord-bots">
                  <span className="link-line" />
                  View all bots
                  <LaunchArrow size={14} />
                </a>
              </div>
              <ul className="bot-list">
                {profile.discordBots.map((bot) => (
                  <li key={bot.name}>
                    <strong>{bot.name}</strong>
                    <span>{bot.category}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ) : null}

        {/* Roblox Scripts section */}
        {ROBLOX_PROJECT ? (
          <Reveal>
            <article className="lua-case">
              <div className="lua-copy">
                <p className="kicker">Secondary Practice</p>
                <h3>{ROBLOX_PROJECT.title}</h3>
                <p>{ROBLOX_PROJECT.description}</p>
                <a className="text-link" href="#/roblox-scripts">
                  <span className="line" />
                  Script previews
                  <LaunchArrow size={14} />
                </a>
              </div>
              <div className="lua-strip">
                {profile.robloxScripts.slice(0, 4).map((script) => (
                  <figure key={script.name}>
                    {script.iconSrc ? (
                      <img src={script.iconSrc} alt="" loading="lazy" />
                    ) : null}
                    <figcaption>{script.name}</figcaption>
                  </figure>
                ))}
              </div>
            </article>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
