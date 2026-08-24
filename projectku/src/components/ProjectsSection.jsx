import { profile } from "../content/profile";
import { WEB_PROJECTS, DISCORD_PROJECT, ROBLOX_PROJECT, isExternalHref } from "../content/site";
import Reveal from "./Reveal";
import { LaunchArrow } from "./CustomIcons";

function ProjectVisual({ project, index }) {
  return (
    <a
      className="case-visual"
      href={project.links?.[0]?.href ?? "#contact"}
      target={isExternalHref(project.links?.[0]?.href) ? "_blank" : undefined}
      rel={isExternalHref(project.links?.[0]?.href) ? "noreferrer" : undefined}
      data-cursor
    >
      {project.thumbnail ? (
        <img src={project.thumbnail} alt="" loading={index > 0 ? "lazy" : "eager"} />
      ) : null}
      <span className="case-hover">
        {project.links?.[0]?.label ?? "Open"}
        <LaunchArrow size={14} />
      </span>
    </a>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="section work">
      <div className="section-index">
        <span>03</span>
        <span>Work</span>
      </div>
      <div className="section-body">
        <Reveal>
          <h2 className="section-title">
            Selected work,
            <em> shown as cases.</em>
          </h2>
        </Reveal>

        <div className="case-list">
          {WEB_PROJECTS.map((project, index) => (
            <Reveal key={project.title} delay={index * 60}>
              <article className={`case-row ${index % 2 ? "is-flip" : ""}`}>
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
                      {project.links[0].label}
                      <LaunchArrow size={14} />
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {DISCORD_PROJECT ? (
          <Reveal>
            <article className="band-case">
              <div>
                <p className="kicker">Discord systems</p>
                <h3>{DISCORD_PROJECT.title}</h3>
                <p>{DISCORD_PROJECT.description}</p>
                <a className="text-link" href="#/discord-bots">
                  View bots
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

        {ROBLOX_PROJECT ? (
          <Reveal>
            <article className="lua-case">
              <div className="lua-copy">
                <p className="kicker">Secondary practice</p>
                <h3>{ROBLOX_PROJECT.title}</h3>
                <p>{ROBLOX_PROJECT.description}</p>
                <a className="text-link" href="#/roblox-scripts">
                  Script previews
                  <LaunchArrow size={14} />
                </a>
              </div>
              <div className="lua-strip">
                {profile.robloxScripts.slice(0, 4).map((script) => (
                  <figure key={script.name}>
                    {script.iconSrc ? <img src={script.iconSrc} alt="" loading="lazy" /> : null}
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
